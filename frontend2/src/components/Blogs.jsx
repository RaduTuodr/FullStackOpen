import { useSelector } from "react-redux"

const Blogs = () => {

    const blogs = useSelector(state => state.blogs)

    return (
        <ul>
            {blogs && blogs.map(blog => (
                <li key={blog.id}>
                    <a href={`/blogs/${blog.id}`}> {blog.title} </a>
                </li>
            ))}
        </ul>
    )
}

export default Blogs