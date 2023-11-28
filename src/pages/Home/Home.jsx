
import Contact from "../../components/Home/Contact";
import Banner from "../../components/Home/Banner";
import Information from "../../components/Home/Information";
import PopularCourse from "../../components/Home/PopularCourse";
import ExpertTeacher from "../../components/Home/ExpertTeacher";
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