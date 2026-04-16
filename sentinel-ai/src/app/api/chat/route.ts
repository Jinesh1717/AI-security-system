import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    if (!message) {
      return Response.json({ error: 'Message is required' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
        return Response.json({ 
            reply: "I am currently in disconnected mode (No Gemini API Key found in .env). To unlock my real-time threat intelligence capabilities, please configure the API Key." 
        });
    }

    // Format history for Gemini
    const systemInstruction = "You are Sentinel AI, an advanced cybersecurity chatbot designed for a Security Operations Center (SOC). Provide concise, technical, and accurate answers regarding cybersecurity, threats, vulnerabilities, and digital trust. Maintain a professional, slightly cyberpunk, and authoritative tone.";
    
    let combinedPrompt = systemInstruction + "\n\nChat History:\n";
    if (history && Array.isArray(history)) {
        history.slice(-5).forEach((msg: any) => {
            combinedPrompt += `${msg.role.toUpperCase()}: ${msg.content}\n`;
        });
    }
    
    combinedPrompt += `\nUSER: ${message}\nSENTINEL AI:`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: combinedPrompt
    });

    return Response.json({ reply: response.text });
  } catch (error) {
    console.error("AI Error:", error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
