const User = require('../models/users')
const userRouter = require('express').Router()

const bcrypt = require('bcrypt')

userRouter.get('/', async (request, response) => {

	const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1, comments: 1 })
	return response.status(200).json(users)
})

userRouter.get('/:id', async (request, response) => {

	const id = request.params.id
	const user = await User.findById(id)

	if (!user) return response.status(404).json({ error: "User not found" })

	return response.status(200).json(user)
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

userRouter.delete('/:id', async (request, response) => {
	const id = request.params.id
	const user = await User.findById(id)

	if (!user) return response.status(404).json({ error: "User not found" })

	await User.findByIdAndDelete(id)
	return response.status(204).end()
})

userRouter.put('/:id', async (request, response) => {
	const id = request.params.id
	const updatedUser = request.body
	console.log(updatedUser)

	const user = await User.findByIdAndUpdate(id, updatedUser)

	return response.status(202).json(user)
})

module.exports = userRouter