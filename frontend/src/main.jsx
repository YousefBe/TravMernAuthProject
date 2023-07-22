import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter , RouterProvider } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import './index.css'
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'

const router = createBrowserRouter([
  {
    path : '/',
    element : <App />,
    children:[
      {
        path : '/',
        index: true ,
        element : <Home />
      },
      {
        path : '/login',
        element : <Login/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
 