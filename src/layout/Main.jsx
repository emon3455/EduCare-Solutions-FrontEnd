import Banner from "../pages/Home/banner/Banner";
import Footer from "../shared/Footer";
import NavBar from "../shared/NavBar";
import { Outlet } from "react-router-dom";

const Main = () => {
    return (
        <div className="main-container">
            <div className="bg-[#07332F] lg:px-[227px] lg:py-10">
                <NavBar />
                <Banner />
            </div>
            <div className="lg:px-[227px] lg:py-10">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Main;