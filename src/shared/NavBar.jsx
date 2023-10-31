
import { Link } from "react-router-dom";
import CContainer from "../components/customComponent/CContainer";
import { AuthContext } from "../providers/AuthProvider";
import { useContext } from "react";
import Swal from "sweetalert2";

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
        <li><Link className="hover:text-secondary" to="/">Home</Link></li>
        <li><Link className="hover:text-secondary" to="/courses">Courses</Link></li>
        <li><Link className="hover:text-secondary" to="/blogs">Blogs</Link></li>
        <li><Link className="hover:text-secondary" to="/sessions">Sessions</Link></li>
        {
            user
                ?
                <li><button onClick={handleLogout} className="btn-primary my-auto">Logout</button></li>
                :
                <li><Link className="hover:text-secondary" to="/login">Login</Link></li>

        }
    </>

    return (
        <header className="bg-primary text-white">
            <CContainer className="navbar">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-primary rounded-box w-52 ">
                            {navMenu}
                        </ul>
                    </div>
                    <Link to="/" className="btn btn-sm btn-neutral bg-primary border-none text-white"> <span className="text-secondary">Edu-Care</span> Solution</Link>
                </div>
                <div className="navbar-end hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navMenu}
                    </ul>
                    {
                        user
                        &&
                        <label className="btn btn-ghost btn-circle avatar btn-sm md:btn-md">
                            <div className=" w-6 md:w-10 rounded-full">
                                <img src={user && user?.photoURL} />
                            </div>
                        </label>
                    }
                </div>
            </CContainer>
        </header>
    );
};

export default Navbar;