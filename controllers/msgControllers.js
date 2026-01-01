import { supabase } from '../connection.js';
import { chosenCipher } from './cipher.js';
import { connectMongo } from '../connection.js';

export async function encryptMessage(req, res) {
  try {
    const { data } = await supabase
      .from('messages')
      .upsert({
        username: req.body.username,
        cipher_type: req.body.cipherType,
        encrypted_text: chosenCipher(req.body.message, req.body.cipherType),
      })
      .select();
    const db = await connectMongo();
    await db
      .collection('users')
      .updateOne(
        { username: req.body.username },
        { $inc: { encryptedMessagesCount: 1 } }
      );

    res.status(201).json({
      id: data[0].id,
      cipherType: req.body.cipherType,
      encryptedText: chosenCipher(req.body.message, req.body.cipherType),
    });

    console.log(data);
  } catch (error) {
    console.error({ error: error });
  }
}

export async function decryptMessage(req, res) {
  try {
    const { data: message, error } = await supabase
      .from('messages')
      .select()
      .eq('id', req.body.messageId);
    if (error) {
      console.error(error);
    } else {
      if (message[0].cipher_type !== 'reverse') {
        res.status(200).json({
          id: message[0].id,
          decryptedText: null,
          error: 'CANNOT_DECRYPT',
        });
      }
      res.status(200).json({
        id: message[0].id,
        decryptedText: chosenCipher(req.body.message, req.body.cipherType),
      });
    }
  } catch (error) {
    console.error({ error: error });
  }
}

export async function getUserSummary(req, res) {
  const { data: messages } = await supabase
    .from('messages')
    .select()
    .eq('username', req.params.username);
  res.status(200).json({ items: messages });
}
