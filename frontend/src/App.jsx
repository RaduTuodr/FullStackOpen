import { useState, useEffect, useRef } from 'react'
import './index.css'

import Toggable from './components/Toggable'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {

  const [loginVisible, setLoginVisible] = useState(false)

  const [notifMessage, setNotifMessage] = useState(null)
  const [notifStyle, setNotifStyle] = useState(null)

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const blogFormRef = useRef()
  const blogRef = useRef()

  

  const compareBlogs = (blog1, blog2) => {
    return (blog2.likes - blog1.likes)
  }

  const loadBlogs = () => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
      blogs.sort(compareBlogs)
    })   
  }

  useEffect(() => {
    loadBlogs()
  }, [])

  useEffect(() => {
    const user = window.localStorage.getItem('loggedUser')
    if (user !== null)
      setUser(user)
  })

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {

    event.preventDefault()

    try {

      const user = await loginService.login({
        username,
        password
      })

      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      window.localStorage.setItem('username', username)

      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      setNotifMessage('Invalid user and password')
      setNotifStyle('error')
      setTimeout(() => {
        setNotifMessage(null)
      }, 3000)
    }
  }

  const handleLike = async (id) => {
    const blog = blogs.find(blog => id === blog.id)
    const updatedBlog = { ...blog, likes: blog.likes + 1}

    try {
      const blogReturned = await blogService.update(id, updatedBlog)
      setBlogs(blogs.map(blog => blog.id === id ? blogReturned : blog)) 
    } catch (exception) {
      setNotifMessage('Failed to update likes')
      setNotifStyle('error')
      setTimeout(() => {
        setNotifMessage(null)
      }, 3000)
    }
  }

  const handleBlogRemove = async (id) => {

    try {

      if (!window.confirm("Do you want to delete this?"))
        throw exception;

      await blogService.remove(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
    } catch (exception) {
      setNotifMessage('Failed to remove blog')
      setNotifStyle('error')
      setTimeout(() => {
        setNotifMessage(null)
      }, 3000)
    }
  }

  const loginForm = () => {
      const hideWhenVisible = { display : loginVisible ? 'none' : '' }
      const showWhenVisible = { display : loginVisible ? '' : 'none' }

      return (
        <div>
          <div style={hideWhenVisible}>
            <button onClick={() => setLoginVisible(true)}>
              log in
            </button>
          </div>

          <div style={showWhenVisible}>
            <LoginForm  
              username = {username}
              password = {password}
              handleUsernameChange = {handleUsernameChange}
              handlePasswordChange = {handlePasswordChange}
              handleSubmit = {handleLogin}>
            </LoginForm>

            <button onClick={() => setLoginVisible(false)}>
              cancel
            </button>
          </div>
        </div>
      )
  }

  const logoutButton = () => {

    const handleLogout = (event) => {
      
      window.localStorage.removeItem('loggedUser')
      location.reload()
    }

    return (
      <button onClick={handleLogout}>Logout</button>
    )
  }

  const blogForm = () => {

    const handleCreateBlog = (blogObject) => {

      blogFormRef.current.toggleVisibility()

      try {

        blogService.create(blogObject).then(returnedBlog => {
          blogs.concat(returnedBlog)
        })

        setNotifMessage(`A new blog ${blogObject.title} by ${blogObject.author} added`)
        setNotifStyle('note')

        loadBlogs()
        
      } catch (exception) {
        setNotifMessage('Please provide title and author')
        setNotifStyle('error')
      }

      setTimeout(() => {
        setNotifMessage (null)
        setNotifStyle (null)
      }, 3000)
    } 

    return (
      <Toggable viewButtonLabel="new blog" hideButtonLabel="cancel" ref={blogFormRef}>
        <BlogForm createBlog={handleCreateBlog}/>
      </Toggable>
    )
  }

  const blogsList = () => {
    
    const userName = window.localStorage.getItem('username')

    return (
      <div>
        <h2>blogs</h2>
        <div>
          {userName} logged in {logoutButton()}
        </div>

        {blogForm()}

        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} 
                handleLike={() => {handleLike(blog.id)}}
                handleBlogRemove={() => {handleBlogRemove(blog.id)}}/>
        )}
      </div>
    )
  }

  return (
    <div>
      <h2>
        Blogs App
      </h2>
      
      <Notification message={notifMessage} style={notifStyle}/>
      {user === null ? loginForm() : blogsList()}
    </div>
  )
}

export default App