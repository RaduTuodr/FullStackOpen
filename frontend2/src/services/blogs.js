import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const getById = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

const createNew = async (object) => {
    const response = await axios.post(baseUrl, object)
    return response.data
}

const update = async (id, updatedOjbect) => {
    const response = await axios.put(`${baseUrl}/${id}`, updatedOjbect)
    return response.data
}

const updateComments = async (id, updatedOjbect) => {
    const response = await axios.put(`${baseUrl}/${id}/comments`, updatedOjbect)
    return response.data
}

export default {
    getAll,
    getById,
    createNew,
    update,
    updateComments
}