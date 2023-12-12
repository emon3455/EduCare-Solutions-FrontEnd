
import Contact from "../../components/Home/Contact";
import Banner from "../../components/Home/Banner";
import Information from "../../components/Home/Information";
import PopularCourse from "../../components/Home/PopularCourse";
import ExpertTeacher from "../../components/Home/ExpertTeacher";
import { useGetAllCourseQuery } from "../../redux/features/courses/courseSlice";
import { useGetAllUserQuery } from "../../redux/features/user/userSlice";

const Home = () => {

    const { isLoading:coursesIsLoading, data:courses, } = useGetAllCourseQuery();
    const { isLoading:usersIsLoading, data:users, } = useGetAllUserQuery();

    return (
        <div>
            <Banner />
            <Information />
            {
                !coursesIsLoading &&  <PopularCourse popularCourses={courses.slice(0,3)} />
            }
            {
                !usersIsLoading &&  <ExpertTeacher popularTeacher={users.slice(0,3)} />
            }
            <Contact />
        </div>
    );
};

export default Home;