import express from 'express';
import {
  encryptMessage,
  decryptMessage,
  getUserSummary,
} from '../controllers/msgControllers.js';
import {
  checkDecryptBody,
  checkEncryptBody,
  checkRegisterBody,
  validUser
} from '../middlewares/middlewares.js';


export const msgRouter = express.Router();

msgRouter.post(
  '/encrypt',
  checkRegisterBody,
  checkEncryptBody,
  validUser,
  (req, res) => {
    encryptMessage(req, res);
  }
);
msgRouter.post(
  '/decrypt',
  checkRegisterBody,
  checkDecryptBody,
  validUser,
  (req, res) => {
    decryptMessage(req, res);
  }
);

msgRouter.get('/:username', validUser, (req, res) => {
  getUserSummary(req, res);
});
