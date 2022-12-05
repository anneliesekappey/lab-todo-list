import { Schema, model } from 'mongoose'

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
    },
    passwordHash: {
      type: String,
      required: [true, 'Password is required'],
    },
    todos: {
      type: ['objectID'],
    },
  },
  { timestamps: true }
)

const Todo = model('Todo', userSchema)

export default Todo
