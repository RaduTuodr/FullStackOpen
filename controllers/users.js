const userRouter = require('express').Router()
const User = require('../models/user')

const bcrypt = require('bcrypt')

userRouter.get('/', async (request, response) => {

    const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1})
    response.status(200).json(users)
})

userRouter.post('/', async (request, response) => {

    const body = request.body

    if (body.password.length < 3)
        response.status(401).json({error:'Password must be at least 3 characters long'})

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash: passwordHash
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

module.exports = userRouter