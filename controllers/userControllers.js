import { connectMongo } from '../connection.js';

export async function getMyMessagesCount(req, res) {
  try {
    const { username } = req.headers;
    const db = await connectMongo();
    const user = await db.collection('users').findOne({ username: username });
    res.status(200).json({
      username: username,
      encryptedMessagesCount: user.encryptedMessagesCount,
    });
  } catch (error) {
    console.error(error);
  }
}
