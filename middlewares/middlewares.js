import { connectMongo } from '../connection.js';

export async function unregisterUser(req, res, next) {
  try {
    const { username } = req.body;
    if (typeof username !== 'string') {
      return res.send(401).send('invalid type of username');
    }
    const db = await connectMongo();
    const user = await db.collection('users').findOne({ username: username });
    return user
      ? res.status(401).send('A user is already registered with this name ')
      : next();
  } catch (error) {
    console.error({ error: error });
  }
}

export async function validUser(req, res, next) {
  try {
    if (req.headers) {
      const { username, password } = req.headers;
      if (typeof username !== 'string' && typeof password !== 'string') {
        return res.send(401).send('invalid type of username or password');
      }
      const db = await connectMongo();
      const user = await db
        .collection('users')
        .findOne({ username: username, password: password });
      return user
        ? next()
        : res.status(401).send('Nobody registered with this name ');
    }
    return res.status(401).send('No Body Added');
  } catch (error) {
    console.error({ error: error });
  }
}

export async function checkRegisterBody(req, res, next) {
  try {
    if (req.body) {
      if (
        req.body.username &&
        req.body.password &&
        typeof username === 'string' &&
        typeof password === 'string'
      ) {
        return next();
      }
      return res.status(401).send('Invalid Body');
    }
    return (401).send('No Body Added');
  } catch (error) {
    console.error({ error: error });
  }
}

export async function checkEncryptBody(req, res, next) {
  try {
    if (req.body) {
      if (req.body.message && req.body.cipherType) {
        return next();
      }
      return res.status(401).send('Invalid Body');
    }
  } catch (error) {
    console.error({ error: error });
  }
}

export async function checkDecryptBody(req, res, next) {
  try {
    if (req.body) {
      if (req.body.messageId) {
        return next();
      }
      return res.status(401).send('Invalid Body');
    }
  } catch (error) {
    console.error({ error: error });
  }
}
