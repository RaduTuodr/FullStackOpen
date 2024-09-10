import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { initializeUsers } from "../reducers/userReducer"
import { login } from "../reducers/loginReducer"
import { initializeBlogs } from "../reducers/blogReducer"

import {
    Table
} from 'react-bootstrap'


const Users = () => {

    const dispatch = useDispatch()
    const { users, loading } = useSelector(state => state.users || {})

    useEffect(() => {
        dispatch(initializeUsers());
        dispatch(initializeBlogs());

        const user = JSON.parse(window.localStorage.getItem('loggedInUser'));
        if (user) {
            dispatch(login(user));
        }
    }, [])

    if (loading)
        return <div> Loading... </div>

    if (!users || users.length === 0)
        return <div> No users found... </div>

    return (
        <Table striped>
            <thead>
                <tr>
                    <th>User</th>
                    <th>Blogs Created</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => {
                    return (
                        <tr key={user.id}>
                            <td>
                                <a href={`/users/${user.id}`} target="_blank">
                                    {user.username}
                                </a>
                            </td>
                            <td>
                                {user.blogs.length}
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}

export default Users