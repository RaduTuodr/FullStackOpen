import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'
import { addBlogToUser } from './userReducer'


const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
        appendBlog(state, action) {
            state.push(action.payload)
        },
        updateBlog(state, action) {
            const id = action.payload.id
            const updatedBlog = action.payload.object

            return state.map(blog =>
                blog.id === id ? updatedBlog : blog
            )
        }
    }
})

export const { setBlogs, appendBlog, updateBlog } = blogSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const addBlog = (info) => {
    return async dispatch => {
        const blog = await blogService.createNew(info.newBlog)
        dispatch(appendBlog(blog))
        dispatch(addBlogToUser({
            blog: blog,
            user: info.user
        }))
    }
}

export const likeBlog = (id) => {
    return async dispatch => {
        const blog = await blogService.getById(id)
        const updatedBlog = {
            ...blog,
            likes: blog.likes + 1
        }
        await blogService.update(id, updatedBlog)
        dispatch(updateBlog({
            id: id,
            object: updatedBlog
        }))
    }
}

export const commentOnBlog = (id, comment) => {
    return async dispatch => {
        const blog = await blogService.getById(id)
        blog.comments.push(comment)
        const updatedComments = blog.comments

        const updatedBlog = {
            ...blog,
            comments: updatedComments
        }

        await blogService.update(id, updatedBlog)
        dispatch(updateBlog({
            id: id,
            object: updatedBlog
        }))
    }
}

export default blogSlice.reducer