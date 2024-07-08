import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'uno.css'
import { createBrowserRouter , RouterProvider} from 'react-router-dom';
import Home from './pages/Home.tsx'
import Error from './pages/Error.tsx'

const router =  createBrowserRouter([
  {
    path: '/',
    element : <Home />,
    errorElement:<Error />
  },
  {
    path:'/game',
    element: <App />
  }

])

ReactDOM.createRoot(document.getElementById('root')!).render(
  
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
