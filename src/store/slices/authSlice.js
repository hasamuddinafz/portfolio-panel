import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../libs/api'

export const loginThunk = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await api.post('/auth/login', { email, password })
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Login failed')
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: !!localStorage.getItem('token'),
        user: JSON.parse(localStorage.getItem('user') || 'null'),
        token: localStorage.getItem('token') || null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false
            state.user = null
            state.token = null
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginThunk.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.loading = false
                state.isAuthenticated = true
                state.token = action.payload.token
                state.user = {
                    id: action.payload.id,
                    fullName: action.payload.fullName,
                    email: action.payload.email,
                    roles: action.payload.roles,
                }
                localStorage.setItem('token', action.payload.token)
                localStorage.setItem('user', JSON.stringify({
                    id: action.payload.id,
                    fullName: action.payload.fullName,
                    email: action.payload.email,
                    roles: action.payload.roles,
                }))
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export const { logout } = authSlice.actions
export default authSlice.reducer