import express from 'express';
import cors from 'cors';
import router from './routes/route';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);

const port = 3000;

app.listen(port, () => console.log(`start server port ${port}`));
