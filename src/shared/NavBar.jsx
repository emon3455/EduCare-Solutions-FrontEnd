import {Link} from "react-router-dom"

const NavBar = () => {
    return (
        <div>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">register</Link>
        </div>
    );
};

export default NavBar;