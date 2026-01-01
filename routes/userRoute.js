import express from 'express';
import { getMyMessagesCount } from '../controllers/userControllers.js';
import { validUser } from '../middlewares/middlewares.js';

export const userRouter = express.Router();

userRouter.get('/me', validUser, (req, res) => {
  getMyMessagesCount(req, res);
});
