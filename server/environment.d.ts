declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      POSTGRES_URI: string;
      SECRET: string;
    }
  }
}

export {};
