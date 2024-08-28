import { useState } from "react"

const BlogForm = ({createBlog}) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()

        createBlog({
            title: title,
            author: author,
            url: url
        })

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <form onSubmit={addBlog}>
            <h2>create new blog</h2>
            
            <div>
                title:
                <input data-testid = 'title' value={title} onChange={event => setTitle(event.target.value)} name='Title'/>  
            </div>

            <div>
                author:
                <input data-testid = 'author' value={author} onChange={event => setAuthor(event.target.value)} name='Author'/> 
            </div>

            <div>
                url:
                <input data-testid = 'url' value={url} onChange={event => setUrl(event.target.value)} name='Url'/>  
            </div>
            
            <button type="submit"> create new blog </button>
        </form> 
    )
}

export default BlogForm