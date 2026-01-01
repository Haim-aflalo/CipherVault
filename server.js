import express from 'express';
import { authRouter } from './routes/authRoute.js';
import { msgRouter } from './routes/msgRoute.js';
import { userRouter } from './routes/userRoute.js';
const app = express();
const port = 3000;

app.use(express.json());
app.use('/auth', authRouter);
app.use('/messages', msgRouter);
app.use('/users', userRouter);

app.listen(port, function (err) {
  console.log('Server listening on Port', port);
});
