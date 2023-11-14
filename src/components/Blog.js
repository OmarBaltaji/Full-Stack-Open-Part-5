import { useState } from "react";

const Blog = ({ blog, onLikeClicked, onDeleteBlog, user }) => {
  const [visible, setVisibility] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  const detailsStyle = {
    marginBottom: '7px'
  };

  const handleLike = async () => {
    blog = {...blog, likes: blog.likes + 1, user: blog.user.id};
    onLikeClicked(blog);
  }

  return (
    <div style={blogStyle}>
      <b style={{ marginRight: '10px' }}>{blog.title} {blog.author}</b>
      <button style={{ marginRight: '10px' }} onClick={() => setVisibility(!visible)}>{visible ? 'Hide' : 'View'}</button>
      {blog.user.username === user.username && <button onClick={() => onDeleteBlog(blog.id)}>Delete</button>}
      {visible && <div>
        <div style={detailsStyle}><a href={blog.url}>{blog.url}</a></div>
        <div style={detailsStyle}>{blog.likes} <button onClick={handleLike}>like</button></div>
        <div>{blog?.user?.name}</div>
      </div>}
    </div>
  )
}

export default Blog