import { useState } from 'react';
import loginService from '../services/login';
import PropTypes from 'prop-types';

const LoginForm = ({ postLogin }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleChange = (target, field) => {
    setCredentials(oldCredentials => ({ ...oldCredentials, [field]: target.value }));
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    const user = await loginService.login(credentials);
    postLogin(user);
    localStorage.setItem('loggedUserInfo', JSON.stringify(user));
  }

  return (
    <>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>username</label>
          <input name="username" value={credentials.username} onChange={({ target }) => handleChange(target, 'username')}  />
        </div>
        <div>
          <label>password</label>
          <input type="password" name="password" value={credentials.password} onChange={({ target }) => handleChange(target, 'password')} />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  )
}

LoginForm.propTypes = {
  postLogin: PropTypes.func.isRequired
}

export default LoginForm;