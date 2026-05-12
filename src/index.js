import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
import { initTheme } from './store/slices/themeSlice'
import App from './App'
import './index.css'

store.dispatch(initTheme())

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)