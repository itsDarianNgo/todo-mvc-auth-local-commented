const mongoose = require('mongoose')
// Sends data to mongodb
const TodoSchema = new mongoose.Schema({ // Set up schema. imagine it as a blueprint. Tells what to do
  todo: {       
    type: String, // Attribute/property - Has to be string to be valid
    required: true, // required field
  },
  completed: {
    type: Boolean, // Can only be true/false
    required: true, // required field
  },
  userId: {       //
    type: String,
    required: true // required field
  }
})

module.exports = mongoose.model('Todo', TodoSchema) // exports as model | Naming model "Todo" and assigning it Todoschema, 



