import Toggable from './Toggable'

const Blog = ({ blog, handleLike, handleBlogRemove }) => {
 
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} data-testid = 'blog'>
      {blog.title && blog.author &&
      <div>
        <div>
          <span> {blog.title} {blog.author} </span>
          <Toggable viewButtonLabel="view" hideButtonLabel="hide" >
            <div>
              {blog.url}
              <br/>
              <div>
                {blog.likes}
                <button onClick={handleLike}>like</button>
              </div>
            </div>
          </Toggable>
        </div>
      </div>}
      <button onClick={handleBlogRemove}>remove</button>
    </div>
  )
}

export default Blog