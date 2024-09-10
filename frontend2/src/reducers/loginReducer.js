import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'


const loginSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        login(state, action) {
            return action.payload
        },
        logout(state, action) {
            return null
        },
    }
})

export const { login, logout } = loginSlice.actions

export const logIn = (user) => {
    return async dispatch => {
        const data = await loginService.login(user)
        dispatch(login(data))
        return data
    }
}

export const logOut = () => {
    return async dispatch => {
        dispatch(logout())
        window.localStorage.removeItem('loggedInUser')
        console.log("HEEREEE    ")
    }
}

export default loginSlice.reducer