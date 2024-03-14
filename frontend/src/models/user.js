import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
})

// voi koittaa toista tapaa jos ei toimi
module.exports = mongoose.model('User', userSchema)
