import Reach from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Blog from '../components/Blog';

test('renders content', () => {
  const onLikeClicked = jest.fn();
  const onDeleteBlog = jest.fn();
  const user = { id: 1, username: 'test', name: 'test' };
  const blog = {
    title: 'test title',
    author: 'random author',
    url: 'https://randomurl.com',
    likes: 0,
    user: user
  };

  const { container } = render(<Blog blog={blog} onLikeClicked={onLikeClicked} onDeleteBlog={onDeleteBlog} user={user} />);

  const element = container.querySelector('.blog');
  expect(element).toBeDefined();

  expect(element).toHaveTextContent(`${blog.title} ${blog.author}`);
  expect(element).not.toHaveTextContent(`${blog.url} ${blog.likes}`);
});