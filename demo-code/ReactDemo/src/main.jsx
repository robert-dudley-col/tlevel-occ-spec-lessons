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
import OrdersUser from './routes/ordersUser';
import OrdersSites from './routes/ordersSites';

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
  },
  {
    path:'/orders/user/:userid',
    element:<OrdersUser/>
  },
  {
    path:'/orders/site',
    element:<OrdersSites/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
