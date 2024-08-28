import PropTypes from 'prop-types'

const LoginForm = (props) => {
    return (
        <div>
            <h2>Log In</h2>
            <form onSubmit={props.handleSubmit}>

            <div>
                Username
                <input data-testid = 'username' value={props.username} onChange={props.handleUsernameChange} name='Username'/>  
            </div>

            <div>
                Password
                <input data-testid = 'password' value={props.password} onChange={props.handlePasswordChange} name='Password' type='password'/> 
            </div>

            <button type="submit"> Login </button>
        </form> 
        </div>
    )
}

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired
}

export default LoginForm