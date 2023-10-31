
import Contact from "./Contact";
import Banner from "../banner/Banner";
import Information from "./Information";
import PopularCourse from "./PopularCourse";
import ExpertTeacher from "./ExpertTeacher";
const Home = () => {
    return (
        <div>
            <Banner/>
            <Information/>
            <PopularCourse/>
            <ExpertTeacher/>
            <Contact/>
        </div>
    );
};

export default Home;