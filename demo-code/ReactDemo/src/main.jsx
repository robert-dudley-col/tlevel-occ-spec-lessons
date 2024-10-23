import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './routes/login';
import Register from './routes/register';
import Sites from './routes/sites';
import Index from './routes';
import Order from './routes/order';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index/>,
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/register',
    element: <Register/>
  },
  {
    path: '/sites',
    element: <Sites/>
  },{
    path:'/order/:orderid',
    element:<Order/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
