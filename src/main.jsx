import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/routes.jsx'

import { Provider } from 'react-redux'
import { store } from './store/Store.jsx'
import axios from 'axios';


/**setup axios */
axios.defaults.baseURL = "https://api.themoviedb.org/3"
axios.defaults.headers.common['Authorization'] = `Bearer ${import.meta.env.VITE_ACCESS_KEY}`


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  

  </StrictMode>,
)
