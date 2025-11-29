interface EnvConfig {
  apiUrl: string;
  socketUrl: string;
  isProduction: boolean;
  isDevelopment: boolean;
}

export const env: EnvConfig = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  socketUrl: import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001',
  isProduction: import.meta.env.PROD,
  isDevelopment: import.meta.env.DEV,
};
