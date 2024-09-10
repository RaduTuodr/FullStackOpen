import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { logIn, logout } from "../reducers/loginReducer"

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const user = useSelector(state => state.user)

    const handleLogin = async (event) => {
        event.preventDefault()

        const result = await dispatch(logIn({ username, password }))
        window.localStorage.setItem('loggedInUser', JSON.stringify(result))

        setUsername('')
        setPassword('')
    }

    if (user) {
        return (
            <>
                <p>{user.username} logged in</p>
                {/* <button onClick={handleLogout}>Logout</button> */}
            </>
        )
    }

    return (
        <form onSubmit={handleLogin}>
            <div>
                Username
                <input
                    type="text"
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                Password
                <input
                    type="password"
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit">Login</button>
        </form>
    )

}

export default Login