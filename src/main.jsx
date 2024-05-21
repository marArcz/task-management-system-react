import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import axios from 'axios'

const router = createBrowserRouter([
  {
    path: "/*",
    element: <App/>,
  },
]);

axios.defaults.baseURL = 'http://localhost:8000/api';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
