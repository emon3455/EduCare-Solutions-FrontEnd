import { Link } from "react-router-dom"

const NavBar = () => {
    return (
        <div className="text-white flex justify-between">
            <div>
                <h3 className="text-2xl font-bold"><span className="text-[#F7A582]">Edu-Care</span> Solutions</h3>
            </div>
            <div className="flex font-medium gap-8">
                <Link to="/">Home</Link>
                <Link to="/courses">Courses</Link>
                <Link to="/blogs">Blogs</Link>
                <Link to="/sessions">Sessions</Link>
                <Link to="/login">Login</Link>
            </div>
        </div>
    );
};

export default NavBar;