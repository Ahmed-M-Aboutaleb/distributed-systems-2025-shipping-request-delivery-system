import { Db, MongoClient } from "mongodb";

let client: MongoClient;

export async function connectDatabase(
  uri: string,
  dbName: string
): Promise<Db> {
  try {
    client = new MongoClient(uri);
    await client.connect();
    console.log("✅ Connected to MongoDB");
    return client.db(dbName);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
}

export async function closeDatabase(): Promise<void> {
  if (client) {
    await client.close();
    console.log("MongoDB connection closed");
  }
}
