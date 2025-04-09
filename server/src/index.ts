import express from 'express';
import cors from 'cors';
import { errorHandler } from '@/utils/middleware';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from 'http';
import resolvers from '@/resolvers/index';
import { readFileSync } from 'fs';
import { Server } from 'socket.io';

const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' });

export interface MyContext {}

const app = express();

const httpServer = http.createServer(app);

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
  },
});

io.on('connection', (socket) => {
  console.log('A user connected. Session:', socket.id);

  socket.on('disconnect', (reason) => {
    console.log('A user disconnected. Reason:', reason);
    console.log('-----');
  });
});

await server.start();

app.use(express.json());

app.use(
  '/',
  cors<cors.CorsRequest>(),
  express.json(),
  expressMiddleware(server)
);

app.get('/health', (_req, res, _next) => {
  res.status(200).json({ status: 'OK' });
});

app.use(errorHandler);

export default httpServer;
