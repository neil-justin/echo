import app from '@/index';
import { PORT } from '@/utils/config';

console.log('PORT', PORT);

app.listen(PORT, () => {
  console.log('Express app is listening on PORT ', PORT);
});
