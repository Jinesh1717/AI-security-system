import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { code } = await req.json();
    
    if (!code) {
      return Response.json({ error: 'Code snippet is required' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
        return Response.json({
            vulnerabilities: [
                { line: 5, severity: "high", issue: "Hardcoded secret (MOCKED)", fix: "Use environment variables." },
                { line: 12, severity: "critical", issue: "SQL Injection vector", fix: "Use parameterized queries." }
            ],
            riskScore: 85
        });
    }

    const prompt = `
    Analyze the following code snippet for security vulnerabilities (SAST).
    Look for OWASP Top 10 issues like SQL Injection, XSS, CSRF, insecure randomness, etc.
    Provide your analysis strictly in JSON format with no markdown wrappers or extra text.
    Format your response exactly like this:
    {
      "vulnerabilities": [
        { "line": 10, "severity": "low" | "medium" | "high" | "critical", "issue": "Description of the vulnerability", "fix": "Suggestion to fix it" }
      ],
      "riskScore": number (0-100)
    }

    Code to analyze:
    "${code}"
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
    console.error("AI Error:", error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
