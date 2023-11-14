import { useState } from "react";
import Togglable from "./Togglable";

const Blog = ({blog}) => {
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

  const [visible, setVisibility] = useState(false);
  
  const toggleVisibility = () => setVisibility(!visible);

  return (
    <div style={blogStyle}>
      <b style={{ marginRight: '10px' }}>{blog.title}</b>
      <button onClick={toggleVisibility}>{visible ? 'Hide' : 'View'}</button>
      {visible && <div>
        <div style={detailsStyle}><a href={blog.url}>{blog.url}</a></div>
        <div style={detailsStyle}>{blog.likes} <button>like</button></div>
        <div>{blog.author}</div>
      </div>}
    </div>
  )
}

export default Blog