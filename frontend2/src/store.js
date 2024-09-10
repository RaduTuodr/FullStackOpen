import { configureStore } from "@reduxjs/toolkit"

import blogReducer from "./reducers/blogReducer"
import userReducer from "./reducers/userReducer"
import notificationReducer from './reducers/notificationReducer'
import loginReducer from "./reducers/loginReducer"


const store = configureStore({
    reducer: {
        blogs: blogReducer,
        users: userReducer,
        notification: notificationReducer,
        user: loginReducer,
    }
})

export default store