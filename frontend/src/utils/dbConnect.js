import mongoose from "mongoose";

const connection = {}; // To prevent multiple db connections

export default async function dbConnect() {
  if (connection.isConnected) {
    console.log('Using existing database connection');
    return;
  }

  const db = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  connection.isConnected = db.connections[0].readyState;

  if (connection.isConnected) {
    console.log('Database connected successfully');
  } else {
    console.log('Database connection failed');
  }
}
