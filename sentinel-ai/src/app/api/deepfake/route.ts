import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { filename, fileType } = await req.json();
    
    // If no API key, return static mock
    if (!process.env.GEMINI_API_KEY) {
        return Response.json({
            riskScore: 88,
            confidenceScore: 94,
            explanation: "MOCKED: No API Key found. Add GEMINI_API_KEY to .env.local and restart server.",
            authenticity: "Synthetic / Deepfake",
            artifacts: ["Facial blending anomaly", "Inconsistent lighting mapped"]
        });
    }

    // Ask Gemini to generate a highly convincing dynamic forensic analysis based on the filename
    const prompt = `
    You are an advanced digital forensics API. The user has uploaded a file named "${filename}" (type: ${fileType}).
    Generate a highly realistic sounding, dynamic deepfake detection analysis report for this file. 
    Make the results random - sometimes say it's 100% authentic, sometimes say it's a deepfake, but vary the findings every single time.
    Provide your analysis strictly in JSON format with no markdown wrappers or extra text.
    Format your response exactly like this:
    {
      "riskScore": number (0-100, where 100 is definite deepfake),
      "confidenceScore": number (80-99),
      "explanation": "A highly technical 2-sentence explanation of the forensic findings.",
      "authenticity": "Authentic Media" | "Suspected Manipulation" | "Synthetic / Deepfake",
      "artifacts": ["artifact 1", "artifact 2"] (e.g. "Color space inconsistency", if authentic return empty array [])
    }
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
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
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
