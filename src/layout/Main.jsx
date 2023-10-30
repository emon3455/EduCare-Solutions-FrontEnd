import Footer from "../shared/Footer";
import NavBar from "../shared/NavBar";
import { Outlet, useLocation } from "react-router-dom";

const Main = () => {

    const arr = [
        "/login",
        "/register",
        "/admin",
    ];
    const location = useLocation();
    const { pathname } = location;
    return (
        <main className="">

            {arr.includes(pathname) ? null : <NavBar />}

            <Outlet />

            {arr.includes(pathname) ? null : <Footer />}

        </main>
    );
};

export default Main;