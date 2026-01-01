import { MongoClient } from 'mongodb';
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

export async function connectMongo() {
  const client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  const db = client.db(process.env.MONGO_DB_NAME);
  console.log('MongoDB connected:', db.databaseName);
  return db;
}

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);
