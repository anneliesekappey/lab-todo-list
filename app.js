import express from 'express'

import * as dotenv from 'dotenv'

dotenv.config()

import './db/index.js'

const app = express()

app.use(express.json())

// app.use(cors())

app.get('/', (req, res) => {
  res.send('It works!')
})

import Todo from './models/Todo.model.js'

app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find()
    res.status(200).json(todo)
  } catch (error) {
    res.status(500).json({ status: 500, msg: error })
  }
})

app.post('/todos', async (req, res) => {
  const { body } = req
  try {
    const newTodo = await Todo.create(body)
    res.status(201).json(newTodo)
  } catch (error) {
    res.status(400).json({ status: 400, msg: console.error() })
  }
})

app.put('/todos/:id', async (req, res) => {
  const { id } = req.params
  try {
    const todo = await Todo.findByIdAndUpdate(id)
    if (todo) {
      res.status(200).json(todo)
    } else {
      res.status(404).json({ msg: 'Not Found' })
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(404).json({ status: 404, msg: error })
    } else {
      res.status(500).json({ status: 500, msg: error })
    }
  }
})

app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params
  try {
    const todo = await Todo.findByIdAndRemove(id)
    res.status(201)
  } catch (error) {
    res.status(400).json({ status: 400, msg: error.message })
  }
})

app.listen(6000, () => {
  console.log('Server running!')
})
