import Footer from "../shared/Footer";
import NavBar from "../shared/NavBar";
import { Outlet } from "react-router-dom";

const Main = () => {
    return (
        <div>
            <NavBar/>
            <Outlet />
            <Footer/>
        </div>
    );
};

export default Main;