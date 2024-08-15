const User = require('../models/user')
const helper = require('./helper')

const { describe, test, beforeEach } = require('node:test')
const assert = require('node:assert')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('testing user input', () => {

    test('password too short', async () => {

        const usersAtStart = await helper.usersInDb()

        const user = {
            "name": "Tudor",
            "username": "TUBROR6",
            "password": "nigga"
        }

        await api.post('/api/users').send(user).expect(201).expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()

        assert.strictEqual(usersAtStart.length + 1, usersAtEnd.length)
    })
})