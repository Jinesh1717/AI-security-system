import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }); 

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    
    if (!text) {
      return Response.json({ error: 'Text is required' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
        // Fallback or mockup if no API key is provided during Hackathon
        console.log("No Gemini API Key found. Returning mocked response.");
        return Response.json({
            riskScore: 88,
            confidenceScore: 95,
            explanation: "MOCKED: This appears to be a fraudulent email attempting to steal credentials. The sense of urgency and suspicious sender domain are strong indicators. No API key was provided.",
            suspiciousPhrases: ["Verify your account", "Click here immediately"],
            severity: "high"
        });
    }

    const prompt = `
    Analyze the following text or URL for phishing and cybersecurity threats.
    Provide your analysis strictly in JSON format with no markdown wrappers or extra text.
    Format your response exactly like this:
    {
      "riskScore": number (0-100),
      "confidenceScore": number (0-100),
      "explanation": "A clear, detailed explanation of why this is or isn't a threat",
      "suspiciousPhrases": ["phrase 1", "phrase 2"],
      "severity": "low" | "medium" | "high" | "critical"
    }

    Text to analyze:
    "${text}"
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
             responseMimeType: "application/json"
        }
    });

    try {
        const rawText = response.text || '{}';
        const cleanText = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
        const result = JSON.parse(cleanText);
        return Response.json(result);
    } catch {
        return Response.json({ error: 'Failed to parse AI response' }, { status: 500 });
    }
  } catch (error) {
    console.error("AI Error:", error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
