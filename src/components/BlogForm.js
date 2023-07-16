import { useState } from "react";
import blogService from '../services/blogs';

const BlogForm = ({ postSubmission }) => {
  const initialPropertiesValues = {
    title: '',
    author: '',
    url: '',
  };

  const [blog, setBlog] = useState(initialPropertiesValues);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newBlog = await blogService.create(blog);
    postSubmission(newBlog);
    setBlog(initialPropertiesValues);
  }

  const handleChange = (target, field) => {
    setBlog(oldBlog => ({ ...oldBlog, [field]: target.value }));
  }

  return (
    <>
      <h3>Create new blog</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>title</label>
          <input name="title" value={blog.title} onChange={({ target }) => handleChange(target, 'title')}  />
        </div>
          <div>
          <label>author</label>
          <input name="author" value={blog.author} onChange={({ target }) => handleChange(target, 'author')}  />
        </div>
          <div>
          <label>url</label>
          <input name="url" value={blog.url} onChange={({ target }) => handleChange(target, 'url')}  />
        </div>
        <button type="submit">Create</button>
      </form>
    </>
  );
}

export default BlogForm;