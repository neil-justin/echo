import dotenv from 'dotenv';

dotenv.config();

interface EnvVariables {
  PORT: number;
}

const envVariables: EnvVariables = {
  PORT: parseInt(process.env.PORT) || 3000,
};

export const { PORT } = envVariables;
