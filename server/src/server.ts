import connectToDb from '@/utils/db';
import httpServer from '.';

const startServer = async () => {
  await connectToDb();
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Apollo server ready at http://localhost:4000/`);
};

startServer();
