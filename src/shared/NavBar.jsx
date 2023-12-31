import { AuthContext } from "../providers/AuthProvider";
import { useContext } from "react";
import Swal from "sweetalert2";
import ActiveLink from "../components/ActiveLink";
import CContainer from "../utils/CContainer/CContainer";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useRole from "../hooks/useRole";

const Navbar = () => {

    const { user, logOut } = useContext(AuthContext);
    const [isRoleLoading, role] = useRole();
    const cart = useSelector(state => state.cart);
    const selectedCourse = cart.filter( classes => classes.selectedUserEmail == user?.email) || []

    const handleLogout = () => {
        logOut()
            .then(() => {
                localStorage.removeItem('edu-care-access-token');
                Swal.fire(
                    'Successfully Logged out!',
                    'Success!',
                    'success'
                )
            })
            .catch(er => console.log(er))
    }

    const navMenu = <>
        <p className=""><ActiveLink className=" text-white" to="/">Home</ActiveLink></p>
        <p className=""><ActiveLink className=" text-white" to="/courses">Courses</ActiveLink></p>
        <p className=""><ActiveLink className=" text-white" to="/blogs">Blogs</ActiveLink></p>
        <p className=""><ActiveLink className=" text-white" to="/sessions">Sessions</ActiveLink></p>
        {
            user
                ?
                <>
                    <p className=""><ActiveLink className=" text-white" to="/suggestedCourses">Suggested Courses</ActiveLink></p>
                    <p className="items-center">
                        <ActiveLink className="text-secondary hover:text-white" to="/dashboard/home">
                            Dashboard
                        </ActiveLink>
                    </p>
                    <button onClick={handleLogout} className="btn-primary my-auto -mt-1">Logout</button>
                </>
                :
                <p className=""><ActiveLink className="text-secondary hover:text-white" to="/login">Login</ActiveLink></p>

        }
    </>

    return (
        <header className="bg-primary text-white">
            <CContainer className="navbar">
                <div className="navbar-start lg:w-1/3">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-primary rounded-box w-52 text-white hover:text-white space-y-2">
                            {navMenu}
                        </ul>
                    </div>
                    <h2 className="text-xs lg:text-xl font-bold text-white"> <span className="text-secondary">Edu-Care</span> Solution</h2>
                </div>
                <div className="flex items-center navbar-end lg:w-2/3">
                    <div className="hidden lg:flex">
                        <ul className="menu menu-horizontal px-1 text-white space-x-4">
                            {navMenu}
                        </ul>
                    </div>
                    {
                        user
                        &&
                        <div className="flex justify-between items-center gap-4">
                            {
                                (!isRoleLoading && role == "Student")
                                &&
                                <ActiveLink to="/dashboard/selectedCourses">
                                    <div className="flex items-center justify-center ml-1">
                                        <div className="indicator">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                            <span className="badge badge-sm indicator-item bg-red-500 text-white">{selectedCourse?.length || 0}</span>
                                        </div>
                                    </div>
                                </ActiveLink>
                            }
                            <Link to={'/dashboard/profile'}>
                                <label className="btn btn-ghost btn-circle avatar btn-sm md:btn-md ms-auto">
                                    <div className="w-6 md:w-10 rounded-full">
                                        <img src={user && user?.photoURL} />
                                    </div>
                                </label>
                            </Link>
                        </div>
                    }
                </div>

            </CContainer>
        </header>
    );
};

export default Navbar;