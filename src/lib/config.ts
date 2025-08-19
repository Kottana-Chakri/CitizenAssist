// Centralized runtime config. Keys are read from Vite env variables at build time.
// IMPORTANT: Never hardcode secrets in source. Place them in .env.local
// Vite exposes env vars prefixed with VITE_

export const config = {
  geminiApiKey: import.meta.env.VITE_GEMINI_API_KEY as string | undefined,
  elevenLabsApiKey: import.meta.env.VITE_ELEVENLABS_API_KEY as string | undefined,
};

export function hasAnyApiKey() {
  return Boolean(config.geminiApiKey || config.elevenLabsApiKey);
}
