import mongoose from "mongoose"

declare global {
  // eslint-disable-next-line no-var
  var mongodb: typeof mongoose | "connecting" | null
  // eslint-disable-next-line no-var
  var mongoClientPromise: Promise<MongoClient> | undefined
}
