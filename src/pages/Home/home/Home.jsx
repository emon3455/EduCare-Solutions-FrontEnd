
import Contact from "./Contact";
import Banner from "../banner/Banner";
import Information from "./Information";
import PopularCourse from "./PopularCourse";
const Home = () => {
    return (
        <div>
            <Banner/>
            <Information/>
            <PopularCourse/>
            <Contact/>
        </div>
    );
};

export default Home;