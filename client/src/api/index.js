import axios from 'axios'

// const API = axios.create({ baseURL: 'https://match-bs3r.onrender.com' })
const API = axios.create({ baseURL: 'http://localhost:5000' })

API.interceptors.request.use((req) => {
  if(localStorage.getItem('clerk-db-jwt')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('clerk-db-jwt')}`
  }

  return req
})

export const fetchActivityCard = (id) => API.get(`/activityCards/${id}`)
export const fetchActivityCards = (page) => API.get(`/activityCards?page=${page}`)
export const createActivityCard = (card) => API.post(`/activityCards`, card)
export const updateActivityCard = (id, card) => API.patch(`/activityCards/${id}`, card)
export const deleteActivityCard = (id) => API.delete(`/activityCards/${id}`)
export const likeActivityCard = (id, userId) => API.patch(`/activityCards/${id}/likeActivityCard`, userId) 

export const signIn = (formData) => API.post('/users/signin', formData)
export const signUp = (formData) => API.post('/users/signup', formData)
export const fetchUserRole = () => API.get('/users/role')