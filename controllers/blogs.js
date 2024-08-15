const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const config = require('../utils/config')

const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {

    const blogs = await Blog.find({}).populate('user', { id: 1, username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {

    const body = request.body
    const user = request.user

    const decodedToken = jwt.verify(request.token, config.SECRET)
    if (!decodedToken.id)
        return response.status(401).json({error:'invalid token'})

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user.id
    })

    try {
        const savedBlog = await blog.save()

        if (user.blogs === undefined)
            user.blogs = [savedBlog._id]
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
            
        response.status(201).json(savedBlog)
    } catch(exception) {
        next(exception)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {

    const id = request.params.id
    const user = request.user

    const decodedToken = jwt.verify(request.token, config.SECRET)
    if (!decodedToken.id)
        return response.status(401).json({error:'invalid token'})

    try {
        const deletedBlog = await Blog.findById(id)

        if (deletedBlog && decodedToken.id === deletedBlog.user.toString()) {

            await Blog.findByIdAndDelete(id)
         
            user.blogs = user.blogs.filter(blogId => blogId !== deletedBlog._id.toString())
            await user.save()
         
            response.status(202).json(deletedBlog)
        }
        else
            response.status(204).json({error: 'No user with said id/token'})
    } catch (exception) {
        next(exception)
    }
})

module.exports = blogsRouter