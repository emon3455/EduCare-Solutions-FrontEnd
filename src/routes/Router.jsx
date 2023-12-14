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
import SingleTeacher from "../components/teachers/singleTeacher/SingleTeacher";
import SingleBlog from "../components/blogs/singleBlog/SingleBlog";
import Dashboard from "../layout/Dashboard";
import DashboardHome from "../pages/dashboard/DashboardHome";
import AdminCourse from "../pages/dashboard/admin/courses/AdminCourse";
import AdminBlogs from "../pages/dashboard/admin/blogs/AdminBlogs";
import AdminSessions from "../pages/dashboard/admin/sessions/AdminSessions";
import PrivateRoutes from "../privateRoutes/PrivateRoutes";
import Error from "../shared/Error";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      errorElement: <Error/>,
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
            path: "/teacher/:id",
            element: <SingleTeacher/>
        },
        {
            path: "/blogs",
            element: <Blogs/>
        },
        {
            path: "/blogs/:id",
            element: <SingleBlog/>
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
    {
      path: "/dashboard",
      element:<PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
      errorElement: <Error/>,
      children:[
        {
            path: "home",
            element: <DashboardHome/>
        },
        {
            path: "courses",
            element: <AdminCourse/>
        },
        {
            path: "blogs",
            element: <AdminBlogs/>
        },
        {
            path: "sessions",
            element: <AdminSessions/>
        },
      ]
    },
]);

export default router;