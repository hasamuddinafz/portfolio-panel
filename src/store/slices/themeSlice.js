import { createSlice } from '@reduxjs/toolkit'

const getInitial = () => {
    const stored = localStorage.getItem('theme')
    if (stored) return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        mode: getInitial(),
    },
    reducers: {
        toggleTheme: (state) => {
            state.mode = state.mode === 'dark' ? 'light' : 'dark'
            localStorage.setItem('theme', state.mode)
            document.documentElement.classList.toggle('dark', state.mode === 'dark')
        },
        initTheme: (state) => {
            document.documentElement.classList.toggle('dark', state.mode === 'dark')
        },
    },
})

export const { toggleTheme, initTheme } = themeSlice.actions
export default themeSlice.reducer