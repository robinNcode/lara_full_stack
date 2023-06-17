import {createBrowserRouter, Navigate} from 'react-router-dom';
import Signin from "./views/Signin.jsx";
import Signup from "./views/Signup.jsx";
import Users from "./views/Users.jsx";
import NotFound from "./views/NotFound.jsx";
import DefaultLayout from "./components/DefaultLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import Dashboard from "./views/Dashboard.jsx";

/**
 * To create a router, we need to import the createBrowserRouter function from react-router-dom.
 * Creating Frontend App template ...
 */
const router = createBrowserRouter([
  {
    path: '/', element: <DefaultLayout/>,
    children: [
      {path: '/', element: <Navigate to='/dashboard'/>},
      {path: '/users', element: <Users/>},
      {path: '/dashboard', element: <Dashboard />}
    ]
  },
  {path: '/', element: <GuestLayout/>,
    children: [
      {path: '/signin', element: <Signin/>},
      {path: '/signup', element: <Signup/>}
    ]
  },

  {path: '*', element: <NotFound/>}
]);

export default router;
