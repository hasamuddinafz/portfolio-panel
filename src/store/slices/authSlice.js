import { createSlice } from '@reduxjs/toolkit'

const TEMP_USER = {
    id: 1,
    name: 'John Doe',
    email: 'admin@portfolio.com',
    avatar: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        user: null,
    },
    reducers: {
        login: (state, action) => {
            const { email, password } = action.payload
            // Temp — developer branch'te API thunk olacak
            if (email === 'admin@portfolio.com' && password === 'admin123') {
                state.isAuthenticated = true
                state.user = TEMP_USER
            }
        },
        logout: (state) => {
            state.isAuthenticated = false
            state.user = null
        },
    },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer