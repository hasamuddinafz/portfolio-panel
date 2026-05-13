import api from "./api"

export const getAllRoles = () => api.get('/role')
export const createRole = (data) => api.post('/role', data)
export const deleteRole = (id) => api.delete(`/role/${id}`)