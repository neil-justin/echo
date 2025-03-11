import app from '@/index';
import { PORT } from '@/utils/config';
import connectToDb from '@/utils/db';

const startServer = async () => {
  await connectToDb();
  app.listen(PORT, () => {
    console.log('Express app is listening on PORT ', PORT);
  });
};

startServer();
