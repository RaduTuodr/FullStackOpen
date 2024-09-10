import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../reducers/loginReducer';


const NavBar = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user)

    const padding = { padding: '0 10px' };

    const handleLogout = (event) => {
        event.preventDefault()
        dispatch(logout())

        window.localStorage.removeItem('loggedInUser')
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">Blog App</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link as="span">
                    <Link class='nav-link centered-text' style={padding} to="/">Home</Link>
                </Nav.Link>
                <Nav.Link as="span">
                    <Link class='nav-link centered-text' style={padding} to="/blogs">Blogs</Link>
                </Nav.Link>
                <Nav.Link as="span">
                    <Link class='nav-link centered-text' style={padding} to="/users">Users</Link>
                </Nav.Link>
                <Nav.Link as="span">
                    {user
                        ? <em class='nav-text disabled centered-text' style={padding}>{user.username} logged in</em>
                        : <Link class='nav-link centered-text' style={padding} to="/login">Login</Link>
                    }
                </Nav.Link>

                {user &&
                    <button class="btn btn-outline-secondary btn-sm mt-auto mb-1"
                        onClick={(event) => handleLogout(event)} > logout </button>
                }
            </Nav>
        </Navbar>
    );
};

export default NavBar;
