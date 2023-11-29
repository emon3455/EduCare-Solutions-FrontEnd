import {
    createBrowserRouter,
} from "react-router-dom";

import Main from "../layout/Main";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Blogs from "../pages/blogs/Blogs";
import Courses from "../pages/courses/Courses";
import Sessions from "../pages/sessions/Sessions";
import Home from "../pages/Home/Home";
import SingleCourse from "../components/courses/singleCourse/SingleCourse";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children:[
        {
            path: "/",
            element: <Home/>
        },
        {
            path: "/courses",
            element: <Courses/>
        },
        {
            path: "/courses/:id",
            element: <SingleCourse/>
        },
        {
            path: "/blogs",
            element: <Blogs/>
        },
        {
            path: "/sessions",
            element: <Sessions/>
        },
        {
            path: "/login",
            element: <Login/>
        },
        {
            path: "/register",
            element: <Register/>
        }
      ]
    },
]);

export default router;