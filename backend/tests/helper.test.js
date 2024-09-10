const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('total likes', () => {

    const listWithOneBlog = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
          likes: 5,
          __v: 0
        }
    ]

    const blogs = [
        listWithOneBlog[0],
        {
            _id: '5a422aa71b54a676234d17f9',
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: 'http://localhost:3001',
            likes: 12,
            __v: 0
          }
    ]
    
    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        assert.strictEqual(result, 5)
    })

    test('when list has more blogs', () => {
        const result = listHelper.favouriteBlog(blogs)
        const correct = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        }

        assert.deepStrictEqual(result, correct)
    })
})

test('dummy returns one', () => {

    const blogs = []
    const result = listHelper.dummy(blogs)

    assert.strictEqual(result, 1)
})