import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

import userService from '../services/users'
import blogService from '../services/blogs'


const User = () => {

    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetch = async () => {

            try {
                const userData = await userService.getById(id);
                setUser(userData);

                const blogPromises = userData.blogs.map(blogId => blogService.getById(blogId))
                const blogsData = await Promise.all(blogPromises)

                setBlogs(blogsData)
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false)
            }
        }
        fetch();
    }, [id])

    if (loading)
        return (
            <div>
                Loading...
            </div>
        )

    if (!user)
        return (
            <div>
                User not found...
            </div>
        )

    return (
        <div>
            <h3>{user.username}</h3>

            <strong>added blogs</strong>
            <ul>
                {blogs.length > 0 && blogs.map(blog => {
                    return (
                        <li key={blog.id}>
                            <a href={`/blogs/${blog.id}`} target="_blank" >
                                {blog.title}
                            </a>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default User