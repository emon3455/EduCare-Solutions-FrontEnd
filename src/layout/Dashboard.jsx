/* eslint-disable react/prop-types */

import { FaBarsStaggered } from "react-icons/fa6";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { SiSessionize } from "react-icons/si";
import { MdLibraryBooks } from "react-icons/md";
import { LuVideotape } from "react-icons/lu";
import useRole from "../hooks/useRole";
import CSkeleton from "../utils/CSkeleton/CSkeleton";
import { FaUsersCog } from "react-icons/fa";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { MdVideoSettings } from "react-icons/md";
import { FaUser } from "react-icons/fa";  
import { useSelector } from "react-redux";
import { AuthContext } from "../providers/AuthProvider";
import { useContext } from "react";

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [isLoading, role] = useRole();
    const cart = useSelector(state => state.cart);
    const selectedCourse = cart.filter( classes => classes.selectedUserEmail == user?.email) || []

    return (
        <main>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">

                    <div className="flex justify-between items-center lg:hidden bg-primary p-4">
                        <h2 className="text-xl font-bold text-white"> <span className="text-secondary">
                            Edu-Care</span> Solution
                        </h2>
                        <label htmlFor="my-drawer-2" className="text-white cursor-pointer hover:text-secondary transition-all duration-500">
                            <FaBarsStaggered />
                        </label>
                    </div>

                    <Outlet></Outlet>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-4/5 sm:w-1/2 md:w-1/3 lg:w-72 min-h-full bg-primary text-white space-y-2  flex flex-col">
                        {/* Sidebar content here */}
                        <Link to={'/'} style={{ marginBottom: "2rem" }}>
                            <h2 className="text-xl font-bold text-white">
                                <span className="text-secondary">Edu-Care</span> Solution
                            </h2>
                            <hr style={{ color: "white" }} />
                        </Link>

                        {
                            isLoading
                                ?
                                <CSkeleton />
                                :
                                (
                                    <>
                                        <NavBarItem title={<> <FaHome /> Home </>} path={'/dashboard/home'} />
                                        <NavBarItem title={<> <FaUser /> Profile </>} path={'/dashboard/profile'} />
                                        {
                                            role === "Admin" &&
                                            <>
                                                <NavBarItem title={<> <LuVideotape />Manage Courses </>} path={'/dashboard/adminCourses'} />
                                                <NavBarItem title={<> <MdLibraryBooks />Manage Blogs </>} path={'/dashboard/adminBlogs'} />
                                                <NavBarItem title={<> <SiSessionize />Manage Sessions </>} path={'/dashboard/adminSessions'} />
                                                <NavBarItem title={<> <FaUsersCog />Manage User </>} path={'/dashboard/manageUsers'} />
                                            </>
                                        }

                                        {
                                            role === "Teacher" &&
                                            <>
                                                <NavBarItem title={<> <LuVideotape />My Courses </>} path={'/dashboard/teacherCourses'} />
                                                <NavBarItem title={<> <MdLibraryBooks />My Blogs </>} path={'/dashboard/teacherBlogs'} />
                                                <NavBarItem title={<> <SiSessionize />My Sessions </>} path={'/dashboard/teacherSessions'} />
                                            </>
                                        }

                                        {
                                            role === "Student" &&
                                            <>
                                                <NavBarItem title={<> 
                                                <MdVideoSettings />Selected Courses {<span className="w-5 h-5 rounded-full bg-red-500 text-white text-sm text-center items-center">{selectedCourse.length}</span>} </>} 
                                                path={'/dashboard/selectedCourses'} />
                                                <NavBarItem title={<> <MdOutlineVideoLibrary />Enrolled Courses </>} path={'/dashboard/enrolledCourses'} />
                                                <NavBarItem title={<> <FaMoneyCheckDollar />Payment History </>} path={'/dashboard/paymentHistory'} />
                                            </>
                                        }

                                    </>
                                )
                        }
                    </ul>
                </div>
            </div>
        </main>
    );
};

export default Dashboard;

const NavBarItem = ({ title, path }) => {
    const location = useLocation();
    return (
        <Link to={path} className={`w-full flex items-center gap-x-4 hover:bg-slate-50 hover:text-primary rounded transition-all duration-500 cursor-pointer p-2 ${location.pathname == path && "bg-slate-50 text-primary font-semibold"} lg:text-lg`}>
            {title}
        </Link>
    )
}