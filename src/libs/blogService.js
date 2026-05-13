import api from "./api"

export const getAllBlogs = () => api.get('/blog')
export const getBlogById = (id) => api.get(`/blog/${id}`)
export const getBlogBySlug = (slug) => api.get(`/blog/slug/${slug}`)
export const createBlog = (data) => api.post('/blog', data)
export const updateBlog = (id, data) => api.put(`/blog/${id}`, data)
export const deleteBlog = (id) => api.delete(`/blog/${id}`)