import { Route, Routes } from 'react-router-dom'

import Notification from './components/Notification'
import Login from './components/Login'
import Users from './components/Users'
import User from './components/User'
import ToggableBlogForm from './components/ToggableBlogForm'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import NavBar from './components/NavBar'


const App = () => {

    return (
        <div className='container'>

            <NavBar />

            <Notification />

            <Routes>
                <Route path='/' element={<> <ToggableBlogForm /> <Users /></>} />
                <Route path='/users' element={<Users />} />
                <Route path='/blogs' element={<Blogs />} />
                <Route path='/blogs/:id' element={<Blog />} />
                <Route path='/users/:id' element={<User />} />
                <Route path='/login' element={<Login />} />
            </Routes>
        </div >
    )
}

export default App
