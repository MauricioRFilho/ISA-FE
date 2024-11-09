// src/config.ts
interface ApiConfig {
    apiBaseUrl: string;
    endpoints: {
      login: string;
      // Adicione outros endpoints, se necessário
    };
  }
  
  const apiConfig: ApiConfig = {
    apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000',
    endpoints: {
      login: '/auth/login',
    },
  };
  
  export default apiConfig;