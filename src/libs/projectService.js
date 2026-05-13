import api from "./api"


export const getAllProjects = () => api.get('/project')
export const createProject = (data) => api.post('/project', data)
export const getProjectById = (id) => api.get(`/project/${id}`)
export const updateProject = (id, data) => api.put(`/project/${id}`, data)
export const deleteProject = (id) => api.delete(`/project/${id}`)