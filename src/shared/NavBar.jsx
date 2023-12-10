import { AuthContext } from "../providers/AuthProvider";
import { useContext } from "react";
import Swal from "sweetalert2";
import ActiveLink from "../components/ActiveLink";
import CContainer from "../utils/CContainer/CContainer";

const Navbar = () => {

    const { user, logOut } = useContext(AuthContext);

    const handleLogout = () => {
        logOut()
            .then(() => {
                Swal.fire(
                    'Successfully Loged out!',
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
                    <p className="items-center">
                        <ActiveLink className="text-secondary hover:text-white" to="/dashboard">
                            Dashboard
                        </ActiveLink>
                    </p>

                    <button onClick={handleLogout} className="btn-primary my-auto lg:-mt-1">Logout</button>
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
                <div className="navbar-end hidden lg:flex lg:w-2/3">
                    <ul className="menu menu-horizontal px-1 text-white space-x-4">
                        {navMenu}
                    </ul>
                </div>
                {
                    user
                    &&
                    <label className="btn btn-ghost btn-circle avatar btn-sm md:btn-md ms-auto">
                        <div className=" w-6 md:w-10 rounded-full">
                            <img src={user && user?.photoURL} />
                        </div>
                    </label>
                }
            </CContainer>
        </header>
    );
};

export default Navbar;