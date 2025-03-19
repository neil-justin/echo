import dotenv from 'dotenv';

dotenv.config();

interface EnvVariables {
  PORT: number;
  POSTGRES_URI: string;
  SECRET: string;
}

const envVariables: EnvVariables = {
  PORT: parseInt(process.env.PORT) || 3000,
  POSTGRES_URI: process.env.POSTGRES_URI,
  SECRET: process.env.SECRET,
};

export const { PORT, POSTGRES_URI, SECRET } = envVariables;
