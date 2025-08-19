import type { Message } from '@/types/chat';
import { config } from './config';
import { getMockResponse } from '@/data/agents';

// Basic AI router: if Gemini key exists, call its REST API; else return mock.
export async function generateAssistantReply(agentId: string, userInput: string, history: Message[]): Promise<string> {
  if (!config.geminiApiKey) {
    return getMockResponse(agentId, userInput);
  }

  // Minimal Gemini 1.5-style JSON request
  try {
    const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=' + encodeURIComponent(config.geminiApiKey), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          ...history.slice(-6).map(m => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.content }] })),
          { role: 'user', parts: [{ text: userInput }] }
        ]
      })
    });

    if (!res.ok) {
      return getMockResponse(agentId, userInput) + `\n\n(Note: Gemini API returned ${res.status})`;
    }
    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text as string | undefined;
    return text || getMockResponse(agentId, userInput);
  } catch (e) {
    return getMockResponse(agentId, userInput);
  }
}

// Optional ElevenLabs TTS: return an audio Blob URL if configured; otherwise null.
export async function synthesizeSpeech(text: string): Promise<string | null> {
  if (!config.elevenLabsApiKey) return null;
  try {
    const voiceId = '21m00Tcm4TlvDq8ikWAM'; // default voice
    const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'xi-api-key': config.elevenLabsApiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text, model_id: 'eleven_turbo_v2' })
    });
    if (!res.ok) return null;
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  } catch {
    return null;
  }
}
