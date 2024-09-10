const loginRouter = require('express').Router()
const User = require('../models/users')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const config = require('../utils/config')


loginRouter.post('/', async (request, response) => {

    const { username, password } = request.body

    const user = await User.findOne({ username })
    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)

    if (!(passwordCorrect && user))
        return response.status(401).json({ error: 'invalid username or password' })

    const userForToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(
        userForToken,
        config.SECRET,
        { expiresIn: 60 * 60 }
    )

    return response.status(200).send({
        token,
        username: user.username,
        id: user._id
    })
})

module.exports = loginRouter