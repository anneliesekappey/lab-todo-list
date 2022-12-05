import { Schema, model } from 'mongoose'

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    user: {
      type: 'objectID',
    },
  },
  { timestamps: true }
)

const Todo = model('Todo', todoSchema)

export default Todo
