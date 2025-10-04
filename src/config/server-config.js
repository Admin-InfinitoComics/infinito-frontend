// Server configuration

// Export the backend URL for API requests
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://api.infinitocomics.com";
// For backward compatibility
export const BASE_URL = BACKEND_URL;
