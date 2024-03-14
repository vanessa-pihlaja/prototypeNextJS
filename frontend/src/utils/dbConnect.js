import mongoose from "mongoose";

const connection = {}; // To prevent multiple db connections

export default async function dbConnect() {
  if (connection.isConnected) {
    console.log('Using existing database connection'); // Log for existing connection
    return;
  }

  const db = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  connection.isConnected = db.connections[0].readyState;

  if (connection.isConnected) {
    console.log('Database connected successfully'); // Log for successful connection
  } else {
    console.log('Database connection failed'); // Log for failed connection
  }
}
