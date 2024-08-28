const Blog = require('../models/blogs')
const blogRouter = require('express').Router()

blogRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
})
  
blogRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(blog)
      })
})

blogRouter.delete('/:id', (request, response) => {

    const id = request.params.id

    Blog.findByIdAndDelete(id).then(result => {
        response.status(204).json(result)
    })
})

blogRouter.put('/:id', (request, response) => {
  const id = request.params.id
  const body = request.body

  const updatedBlog = {
      likes: body.likes
  }

  Blog.findByIdAndUpdate(id, updatedBlog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
    .catch(error => {
      response.status(400).send({ error: 'Failed to update blog' })
    })
})

module.exports = blogRouter