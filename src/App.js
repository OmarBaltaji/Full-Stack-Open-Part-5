import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserInfo = localStorage.getItem('loggedUserInfo');

    if (loggedUserInfo) {
      const userInfo = JSON.parse(loggedUserInfo);
      setUser(userInfo);
    }
  }, [])

  const postLogin = (user) => {
   setUser(user);
  }

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('loggedUserInfo');
  }

  return (
    <div>
      {!user && <LoginForm postLogin={postLogin} />}
      {user &&
        <>
          <button onClick={handleLogout}>Logout</button>
          <h2>blogs</h2>
          <p>Logged in as {user.name}</p>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </>
      }
    </div>
  )
}

export default App