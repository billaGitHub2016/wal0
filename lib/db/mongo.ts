import mongoose from "mongoose"
import { MongoClient } from "mongodb"
import { env } from "@/lib/env"

if (!global.mongoClientPromise) {
  const client = new MongoClient(env.MONGODB_URI)
  global.mongoClientPromise = client.connect()
}

export const clientPromise = global.mongoClientPromise

/**
 * connect MongoDB and init data
 */
export async function connectToDatabase(): Promise<void> {
  if (global.mongodb) {
    return
  }
  global.mongodb = "connecting"

  try {
    global.mongodb = await mongoose.connect(env.MONGODB_URI, {
      bufferCommands: true,
      maxConnecting: Number(env.DB_MAX_LINK || 5),
      maxPoolSize: Number(env.DB_MAX_LINK || 5),
      minPoolSize: 2,
      serverSelectionTimeoutMS: 15000,  // Add this: increase server selection timeout
      connectTimeoutMS: 15000,           // Add this: increase connection timeout
    })

    console.log("mongo connected")
  } catch (error: unknown) {
    console.log("error->", "mongo connect error", error)
    global.mongodb = null
  }
}
