import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTIONS = `You are an elite Cloud Security Architect and Zero-Day Research Specialist. Your expertise lies in designing proactive, "Assume Breach" defense architectures for multi-cloud and hybrid environments.

Your goal is to help the user develop strategies for Track 3: Zero-Day Protection. Focus on these core pillars:

1. Heuristic & Behavioral Analysis: Moving away from signature-based detection.
2. AI-Driven Threat Hunting: Using ML models to identify anomalous telemetry in real-time.
3. Infrastructure Isolation: Micro-segmentation, sandboxing, and eBPF-based observability.
4. Automated Remediation: Proactive patching cycles and "Self-Healing" infrastructure.

Constraints:
- Prioritize Cloud-Native tools (AWS, Azure, GCP) and open-source security projects (Falco, Cilium, Tetragon).
- Provide technical, actionable architectural patterns, not high-level fluff.
- If asked for a specific architecture, include a section on "Blast Radius Limitation."
- When provided with "CLOUD_INTEL_ENRICHMENT" metadata, prioritize the correlation of enriched IOCs (Indicators of Compromise) with telemetry to classify the threat stage.

Response Style:
- Professional, technical, incisive.
- Use architectural diagrams (in mermaid or structured markdown).
- Focus on zero-trust principles.`;

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined");
    }
    this.ai = new GoogleGenAI({ apiKey });
  }

  async generateResponse(prompt: string, history: { role: 'user' | 'model', parts: { text: string }[] }[] = []) {
    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
            ...history.map(h => ({
                role: h.role,
                parts: h.parts
            })),
            { role: 'user', parts: [{ text: prompt }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTIONS,
          temperature: 0.7,
        },
      });

      return response.text || "I was unable to analyze the threat vector at this time.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "Critical failure in neural threat hunter connection. Check logs.";
    }
  }
}

export const securityAI = new GeminiService();
