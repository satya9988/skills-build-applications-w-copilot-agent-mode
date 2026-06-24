/**
 * API Configuration for OctoFit Tracker
 * 
 * Requires VITE_CODESPACE_NAME to be set in .env.local or environment.
 * If not set, falls back to localhost:8000.
 */

const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME;

// Safe fallback: use localhost if VITE_CODESPACE_NAME is not set
const API_BASE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

console.log(`API Base URL: ${API_BASE_URL}`);
if (!CODESPACE_NAME) {
  console.warn('VITE_CODESPACE_NAME not set. Using localhost fallback.');
}

export { API_BASE_URL, CODESPACE_NAME };
