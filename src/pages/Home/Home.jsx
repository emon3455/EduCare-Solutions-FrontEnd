
import Contact from "../../components/Home/Contact";
import Banner from "../../components/Home/Banner";
import Information from "../../components/Home/Information";
import PopularCourse from "../../components/Home/PopularCourse";
import ExpertTeacher from "../../components/Home/ExpertTeacher";
import { useGetAllCourseQuery } from "../../redux/features/courses/courses-api-slice";
import { useGetAllUserQuery } from "../../redux/features/user/user-api-slice";

const Home = () => {

    const { isLoading: coursesIsLoading, data: courses, } = useGetAllCourseQuery();
    const { isLoading: usersIsLoading, data: users, } = useGetAllUserQuery();

    return (
        <div>
            <Banner />
            <Information />
            {
               <PopularCourse popularCourses={courses || []} coursesIsLoading={coursesIsLoading} />
            }
            {
               <ExpertTeacher popularTeacher={users || []} usersIsLoading={usersIsLoading} />
            }
            <Contact />
        </div>
    );
};

export default Home;