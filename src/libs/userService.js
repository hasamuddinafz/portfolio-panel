import api from "./api"

export const getAllUsers = () => api.get('/users')
export const getUserById = (id) => api.get(`/users/${id}`)
export const createUser = (data) => api.post('/users', data)
export const updateUser = (id, data) => api.put(`/users/${id}`, data)
export const deleteUser = (id) => api.delete(`/users/${id}`)
export const assignRole = (id, roleId) => api.post(`/users/${id}/roles`, { roleId })
export const changePassword = (data) => api.post('/auth/change-password', data)