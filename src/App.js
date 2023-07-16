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

  const postLogin = (user) => {
   setUser(user);
  }

  return (
    <div>
      {!user && <LoginForm postLogin={postLogin} />}
      {user &&
        <>
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