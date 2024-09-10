import React, { useState } from 'react';

import { addBlog } from '../reducers/blogReducer';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';


const BlogForm = () => {

    const dispatch = useDispatch();

    const user = useSelector(state => state.user)

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const newBlog = {
            title,
            author,
            url
        };
        dispatch(addBlog({
            newBlog: newBlog,
            user: user
        }))
        dispatch(setNotification(`blog '${title}' has been added!`))
    };

    return (
        <form onSubmit={handleSubmit} className="p-3">
            <div>
                <label> Title </label>
                <input
                    type='text'
                    className="form-control"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter blog title"
                    required
                />
            </div>

            <div>
                <label> Author </label>
                <input
                    className="form-control"
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Enter author's name"
                    required
                />
            </div>

            <div>
                <label> Info URL</label>
                <input
                    type="url"
                    className="form-control"
                    id="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter blog URL"
                />
            </div>

            <button type="submit" className="btn btn-secondary">Submit</button>
        </form>
    );
};

export default BlogForm;
