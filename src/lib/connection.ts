import mongoose from "mongoose";
import { config } from "@/config";

const { mongoUrl } = config;

type connectionObject = {
  isConnected?: number;
};
const connection: connectionObject = {};

export async function ConnectDataBase() {
  if (connection.isConnected) {
    return;
  }
  try {
    const client = await mongoose.connect(mongoUrl);
    connection.isConnected = client.connections[0].readyState;
    console.log(`${mongoose.connection.name} is connected`);
  } catch (error) {
    console.log("error in connecting database", error);
  }
}
