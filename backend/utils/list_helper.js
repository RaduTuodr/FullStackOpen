const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {

    var sumLikes = 0
    blogs.map(blog => {
        sumLikes = sumLikes + blog.likes
    })

    return sumLikes
}

const favouriteBlog = (blogs) => {

    var maxLikes = 0
    var favBlog = null

    blogs.map(blog => {
        if (maxLikes < blog.likes) {
            
            maxLikes = blog.likes
            favBlog = blog
        }
    })

    var result = {
        title: favBlog.title,
        author: favBlog.author,
        likes: favBlog.likes
    }

    return result
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}