import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}` 
}

const create = newBlog => {

  const config = {
    headers: { Authorization: token }
  }

  const request = axios.post(baseUrl, newBlog, config)
  return request.then(response => response.data)
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const update = async (id, updatedBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog)
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}

export default { 
  getAll, 
  setToken, 
  create, 
  update, 
  remove, 
}