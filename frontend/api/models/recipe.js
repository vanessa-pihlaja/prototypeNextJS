const mongoose = require('mongoose')


const recipeSchema = new mongoose.Schema({
  url: String,
  title: String,
  content: String,
})

recipeSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Recipe', recipeSchema)