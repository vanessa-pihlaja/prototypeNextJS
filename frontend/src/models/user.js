import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  savedRecipes: {
    type: [{
      recipeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
      category: { type: String, required: true }
    }],
    default: [] // Ensure it's always initialized
  }
})


const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User