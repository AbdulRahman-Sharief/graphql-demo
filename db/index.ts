import mongoose, { Mongoose, ConnectOptions, ConnectionStates } from "mongoose";
import { mongo } from "../config/environment";

let isConnected: ConnectionStates;
let db: Mongoose | undefined;

const connectDB = async () => {
  if (isConnected) return db;

  try {
    db = await mongoose.connect(mongo.url);
    isConnected = db.connections[0].readyState;
    return db;
  } catch (err: any) {
    throw new Error(err);
  }
};

export default connectDB;
