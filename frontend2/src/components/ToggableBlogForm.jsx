import Toggable from './Toggable'
import BlogForm from './BlogForm'


const ToggableBlogForm = () => {

    return (
        <Toggable viewButtonLabel="new blog" hideButtonLabel="hide">
            <BlogForm />
        </Toggable>
    )
}

export default ToggableBlogForm