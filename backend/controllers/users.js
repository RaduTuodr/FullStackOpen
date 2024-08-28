const User = require('../models/users')
const userRouter = require('express').Router()

const bcrypt = require('bcrypt')

userRouter.get('/', async (request, response) => {

  const users = await User.find({}).populate('blogs', {title: 1, author: 1, url: 1, likes: 1})
  return response.status(200).json(users)
})

userRouter.post('/', async (request, response) => {
    
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      passwordHash: passwordHash
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

module.exports = userRouter