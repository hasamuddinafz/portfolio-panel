import api from "./api"

export const uploadFile = (data) => api.post('/file/upload', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
})
export const deleteFile = (fileUrl) => api.delete(`/file/delete?fileUrl=${fileUrl}`)