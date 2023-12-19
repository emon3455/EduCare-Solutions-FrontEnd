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
import AdminRoutes from "../privateRoutes/AdminRoutes";
import ManageUser from "../pages/dashboard/admin/user/ManageUser";
import TeacherBlogs from "../pages/dashboard/teacher/blogs/TeacherBlogs";
import TeacherRoutes from "../privateRoutes/TeacherRoutes";
import TeacherCourses from "../pages/dashboard/teacher/courses/TeacherCourses";
import TeacherSessions from "../pages/dashboard/teacher/sessions/TeacherSessions";
import StudentRoutes from "../privateRoutes/StudentRoutes";
import SelectedCourse from "../pages/dashboard/student/selectedCourse/SelectedCourse";
import EnrolledCourses from "../pages/dashboard/student/enrolledCourse/EnrolledCourses";
import PaymentHistory from "../pages/dashboard/student/paymentHistory/PaymentHistory";
import AdminTeacherRoutes from "../privateRoutes/AdminTeacherRoutes";
import UpdateCourse from "../components/admin/courses/updateCourse/UpdateCourse";
import UpdateBlog from "../components/admin/blogs/updateBlog/UpdateBlog";
import UpdateSession from "../components/admin/sessions/updateSession/UpdateSession";
import Profile from "../pages/dashboard/Profile";

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
            element: <PrivateRoutes><SingleCourse/></PrivateRoutes>
        },
        {
            path: "/teacher/:id",
            element: <PrivateRoutes><SingleTeacher/></PrivateRoutes>
        },
        {
            path: "/blogs",
            element: <Blogs/>
        },
        {
            path: "/blogs/:id",
            element: <PrivateRoutes><SingleBlog/></PrivateRoutes>
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
            element: <PrivateRoutes><DashboardHome/></PrivateRoutes>
        },
        {
            path: "profile",
            element: <PrivateRoutes><Profile/></PrivateRoutes>
        },
        // -----admin routes-----
        {
            path: "adminCourses",
            element: <AdminRoutes><AdminCourse/></AdminRoutes>
        },
        {
            path: "adminBlogs",
            element: <AdminRoutes><AdminBlogs/></AdminRoutes>
        },
        {
            path: "adminSessions",
            element: <AdminRoutes><AdminSessions/></AdminRoutes>
        },
        {
            path: "manageUsers",
            element: <AdminRoutes><ManageUser/></AdminRoutes>
        },
        // -----Teacher routes-----
        {
            path: "teacherCourses",
            element: <TeacherRoutes><TeacherCourses/></TeacherRoutes>
        },
        {
            path: "teacherBlogs",
            element: <TeacherRoutes><TeacherBlogs/></TeacherRoutes>
        },
        {
            path: "teacherSessions",
            element: <TeacherRoutes><TeacherSessions/></TeacherRoutes>
        },
        // -----selected routes-----
        {
            path: "selectedCourses",
            element: <StudentRoutes><SelectedCourse/></StudentRoutes>
        },
        {
            path: "enrolledCourses",
            element: <StudentRoutes><EnrolledCourses/></StudentRoutes>
        },
        {
            path: "paymentHistory",
            element: <StudentRoutes><PaymentHistory/></StudentRoutes>
        },
        //-----------admin & teacher routes------------
        {
            path: "updateCourse/:id",
            element: <AdminTeacherRoutes> <UpdateCourse/> </AdminTeacherRoutes>,
            loader: ({params})=> fetch(`https://edu-care-backend.vercel.app/classes/${params.id}`)
        },
        {
            path: "updateBlog/:id",
            element: <AdminTeacherRoutes> <UpdateBlog/> </AdminTeacherRoutes>,
            loader: ({params})=> fetch(`https://edu-care-backend.vercel.app/blogs/${params.id}`)
        },
        {
            path: "updateSession/:id",
            element: <AdminTeacherRoutes> <UpdateSession/> </AdminTeacherRoutes>,
            loader: ({params})=> fetch(`https://edu-care-backend.vercel.app/sessions/${params.id}`)
        },
      ]
    },
]);

export default router;