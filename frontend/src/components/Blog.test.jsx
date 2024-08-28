import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect } from 'vitest'

test('renders content', async () => {
  const blog = {
    title: 'RaduTudor',
    author: 'Tudor',
    url: 'https://google.com'
  }

  const mockLikeHandler = vi.fn()
  const mockRemoveHandler = vi.fn()

  render(<Blog 
    blog={blog} 
    handleLike={mockLikeHandler} 
    handleBlogRemove={mockRemoveHandler} />)

  const user = userEvent.setup()
  const likeButton = screen.getByText(/like/i)

  await user.click(likeButton)
  
  expect(mockLikeHandler.mock.calls).toHaveLength(1)
})

test('renders blog', async () => {

  const blog = {
    title: 'RaduTudor',
    author: 'Tudor',
    url: 'https://google.com'
  }
  
  const mockLikeHandler = vi.fn()
  const mockRemoveHandler = vi.fn()

  const { container } = render(
      <Blog 
        blog={blog}
        handleLike={mockLikeHandler}
        handleBlogRemove={mockRemoveHandler} />)

  screen.debug()

  // const div = container.querySelector('.blog')

  // expect(div).toHaveTextContent(/RaduTudor/i)
  
  const titleElement = screen.queryByText(/RaduTudor/i)
  const authorElement = screen.queryByText(/Tudor/i)
  const urlElement = screen.queryByText(/https:\/\/google\.com/i)

  expect(titleElement).not.toBeNull()
  expect(authorElement).not.toBeNull()
})