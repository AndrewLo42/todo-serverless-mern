const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title: {
      type: String,
      // unique: true,
      required: true
    },
    deadline: {
      type: Date
    },
    description: {
      type: String
    },
    completed: {
      type: Boolean,
      default: false
    }
});

const todoModel  = mongoose.model("Todo", todoSchema);

module.exports = todoModel;
