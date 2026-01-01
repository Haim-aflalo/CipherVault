import express from 'express';
import { registerUser } from '../controllers/authControllers.js';
import { validUser, checkRegisterBody } from '../middlewares/middlewares.js';

export const authRouter = express.Router();

authRouter.post('/register', checkRegisterBody, validUser, (req, res) => {
  registerUser(req, res);
});
