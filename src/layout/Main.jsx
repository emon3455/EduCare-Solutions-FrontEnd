import Banner from "../pages/Home/banner/Banner";
import Footer from "../shared/Footer";
import NavBar from "../shared/NavBar";
import { Outlet } from "react-router-dom";

const Main = () => {
    return (
        <main className="">

            <NavBar />
            <Banner/>
            <section className="container mx-auto">
                <Outlet />
            </section>

            <Footer />

        </main>
    );
};

export default Main;