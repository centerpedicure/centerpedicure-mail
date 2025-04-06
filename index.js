import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import router from './router/router.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;
const allowedOrigin = "http://127.0.0.1:5500";

app.use(cors({
  origin: allowedOrigin,
  methods: ['POST'],
}));

app.use(express.json());

app.use((req, res, next) => {
  const origin = req.headers.origin || '';
  const referer = req.headers.referer || '';
  const userAgent = req.headers['user-agent'] || '';

  if (
    (origin === allowedOrigin || referer.startsWith(allowedOrigin)) &&
    !userAgent.includes('Postman') &&
    !userAgent.includes('curl')
  ) {
    next();
  } else {
    return res.status(403).json({ message: "Доступ запрещён" });
  }
});

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
