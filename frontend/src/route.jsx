import {createBrowserRouter} from 'react-router-dom';
import Signin from "./views/Signin.jsx";
import Signup from "./views/Signup.jsx";
import Users from "./views/Users.jsx";
import NotFound from "./views/NotFound.jsx";


const router = createBrowserRouter([
  {path: '/signin', element: <Signin/>},
  {path: '/signup', element: <Signup/>},
  {path: '/users', element: <Users/>},
  {path: '*', element: <NotFound/>}
]);

export default router;
