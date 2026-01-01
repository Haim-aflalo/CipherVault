import { connectMongo } from '../connection.js';

export async function registerUser(req, res) {
  try {
    const { username, password } = req.body;
    const userObj = {
      username: username,
      password: password,
      encryptedMessagesCount: 0,
      createdAt: new Date().toISOString(),
    };
    const db = await connectMongo();
    const user = await db.collection('users').insertOne(userObj);
    res.status(201).json({ id: user.insertedId, username: username });
  } catch (error) {
    console.error(error);
  }
}
