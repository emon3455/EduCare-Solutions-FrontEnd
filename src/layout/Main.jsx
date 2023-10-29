
import Footer from "../shared/Footer";
import NavBar from "../shared/NavBar";
import { Outlet } from "react-router-dom";

const Main = () => {
    return (
        <main className="">

            <NavBar />

            <Outlet />

            <Footer />

        </main>
    );
};

export default Main;