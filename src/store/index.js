import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import themeReducer from './slices/themeSlice'
import sidebarReducer from './slices/sidebarSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        theme: themeReducer,
        sidebar: sidebarReducer,
    },
})