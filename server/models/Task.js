const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  columnId: {
    type: String,
    required: true,
    enum: ['todo', 'inprogress', 'done'],
    default: 'todo'
  }
}, {
  timestamps: true,
})

module.exports = mongoose.model('Task', taskSchema)