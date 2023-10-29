import Footer from "../shared/Footer";
import NavBar from "../shared/NavBar";
import { Outlet } from "react-router-dom";

const Main = () => {
    return (
        <div className="main-container">

            <NavBar />

            <div className="">
                <Outlet />
            </div>

            <Footer />

        </div>
    );
};

export default Main;