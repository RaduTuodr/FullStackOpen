const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('assert')

const api = supertest('../app')

test.only('get correct amount of blogs', async () => {

    const response = await api.delete(`/api/blogs/66b90197a13b0086069d63bc`)
                                .expect(204)
    const titles = response.body.map(blog => blog.title)

    assert.strictEqual(titles.length, 2)
})

after(async () => {
    await mongoose.connection.close()
})