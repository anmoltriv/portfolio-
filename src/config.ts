const DEV_API_FALLBACK = "http://localhost:3001";

/**
 * Public URL of the chat backend (deployed separately from this static site).
 * Set VITE_API_URL at build time; Vite inlines it, so it must exist in the
 * deploy environment, not just in a local .env.
 */
function resolveApiBaseUrl(): string {
  const configured = import.meta.env.VITE_API_URL?.trim();
  if (configured) return configured.replace(/\/+$/, "");

  if (import.meta.env.DEV) return DEV_API_FALLBACK;

  // Silently falling back to localhost in a deployed build makes every chat
  // request fail with no explanation, so say so out loud instead.
  console.error(
    "VITE_API_URL is not set. Add it to the hosting provider's environment variables, pointing at the backend's public URL."
  );
  return "";
}

export const API_BASE_URL = resolveApiBaseUrl();
