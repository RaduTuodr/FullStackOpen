import { createSlice } from '@reduxjs/toolkit'

import userService from '../services/users'


const userSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        loading: false
    },
    reducers: {
        setUsers(state, action) {
            state.users = action.payload
            state.loading = false
        },
        appendUser(state, action) {
            state.users.push(action.payload)
        },
        setLoading(state, action) {
            state.loading = true
        }
    }
})

export const { setUsers, appendUser, setLoading } = userSlice.actions

export const initializeUsers = () => {
    return async dispatch => {
        try {
            dispatch(setLoading())
            const users = await userService.getAll()
            dispatch(setUsers(users))
        } catch (error) {
            console.log(error)
        }
    }
}

export const addUser = (user) => {
    return async dispatch => {
        const userAdded = await userService.createNew(user)
        dispatch(appendUser(userAdded))
    }
}

export const addBlogToUser = (info) => {
    return async dispatch => {
        const userToUpdate = await userService.getById(info.user.id)
        await userToUpdate.blogs.push(info.blog.id)
        await userService.update(info.user.id, userToUpdate)
    }
}

export default userSlice.reducer