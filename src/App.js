import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

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
      blogService.setToken(userInfo.token);
    }
  }, [])

  const postLogin = (user) => {
   setUser(user);
  }

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('loggedUserInfo');
  }

  const postSubmission = (newBlog) => {
    setBlogs(oldBlogs => [...oldBlogs, newBlog]);
  }

  return (
    <div>
      {!user && <LoginForm postLogin={postLogin} />}
      {user &&
        <>
          <button onClick={handleLogout}>Logout</button>
          <h2>blogs</h2>
          <p><strong>Logged in as {user.name}</strong></p>
          <BlogForm postSubmission={postSubmission} />
          <br />
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </>
      }
    </div>
  )
}

export default App