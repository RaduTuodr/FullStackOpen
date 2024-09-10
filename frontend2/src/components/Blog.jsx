import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import { useParams } from "react-router-dom"

import blogService from '../services/blogs'

import { likeBlog, commentOnBlog } from "../reducers/blogReducer";


const Blog = () => {

    const dispatch = useDispatch();

    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const fetch = async () => {

            try {
                const blogData = await blogService.getById(id);
                setBlog(blogData)
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetch();
    }, [id, blog])

    const handleLike = (event, id) => {
        event.preventDefault();
        dispatch(likeBlog(id))
    }

    const handleComment = (event) => {
        event.preventDefault();

        dispatch(commentOnBlog(id, comment));
        setComment('')
    }

    if (loading) return <div>Loading...</div>

    return (
        <div>
            <h5> {blog.title} </h5>

            <a href={blog.url} target="_blank"> {blog.url} </a>
            <div> {blog.likes}
                <button onClick={(event) => handleLike(event, blog.id)}>like</button>
            </div>
            <div> added by {blog.author} </div>
            <ul>
                {blog.comments && blog.comments.map((_comment, index) => {
                    return (
                        <li key={index}> {_comment} </li>
                    )
                })}
            </ul>
            <div>
                <input value={comment} onChange={() => setComment(event.target.value)} />
                <button onClick={(event) => handleComment(event)}> add comment </button>
            </div>
        </div >
    )
}

export default Blog