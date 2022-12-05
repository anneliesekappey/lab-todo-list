import { Router } from 'express'
import User from '../models/User.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'

dotenv.config()

const router = Router()

router.post('/auth/signup', async (req, res, next) => {
  let { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400).json({ message: 'Provide name, email and password' })
    return
  }

  const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/

  if (!emailRegex.test(email)) {
    res.status(400).json({ message: 'Provide a valid email address' })
    return
  }

  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}/

  if (!passwordRegex.test(password)) {
    res.status(400).json({
      message:
        'Password must contain at least 6 characters and at least one number, one lowercase and one uppercase letter',
    })
    return
  }

  try {
    const userFound = await User.findOne({ email })

    if (userFound) {
      res.status(400).json({
        message: 'User already registered',
      })
      return
    }

    const salt = bcrypt.genSaltSync(10)
    const passwordHash = bcrypt.hashSync(password, salt)

    const createdUser = await User.create({ name, email, passwordHash })

    const { _id } = createdUser

    res.status(201).json({ name, email, _id })
  } catch (error) {
    next(error)
  }
})

router.post('/auth/login', async (req, res, next) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      res.status(400).json({ message: 'user not found' })
      return
    }

    const compareHash = bcrypt.compareSync(password, user.passwordHash)

    if (!compareHash) {
      res.status(400).json({ message: 'invalid password' })
      return
    }

    const payload = {
      id: user._id,
      email: user.email,
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 'Id' })
    res.status(200).json({ ...payload, token })
  } catch (error) {
    next(error)
  }
})

export default router
