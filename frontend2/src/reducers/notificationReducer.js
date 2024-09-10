import { createSlice } from "@reduxjs/toolkit"


const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        notificationChange(state, action) {
            return action.payload
        },
        notificationClear(state, action) {
            return ''
        }
    }
})

export const { notificationChange, notificationClear } = notificationSlice.actions

export const setNotification = (message, timer = 3) => {
    return async dispatch => {
        dispatch(notificationChange(message))
        setTimeout(() => {
            dispatch(notificationClear())
        }, timer * 1000)
    }
}

export default notificationSlice.reducer