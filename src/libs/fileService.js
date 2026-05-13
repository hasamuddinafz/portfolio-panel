import api from "./api"

export const uploadFile = (data) => api.post('/file/upload', data)
export const deleteFile = (fileUrl) => api.delete(`/file/delete?fileUrl=${fileUrl}`)