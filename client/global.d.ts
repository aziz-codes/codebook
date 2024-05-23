import { MongoClient } from "mongodb";

declare global {
  interface MyGlobal {
    _mongoClientPromise: Promise<MongoClient> | undefined;
  }
  export {};
}
