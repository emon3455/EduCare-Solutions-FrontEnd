
import Contact from "../../components/Home/Contact";
import Banner from "../../components/Home/Banner";
import Information from "../../components/Home/Information";
import PopularCourse from "../../components/Home/PopularCourse";
import ExpertTeacher from "../../components/Home/ExpertTeacher";
import { useGetAllCourseQuery } from "../../redux/features/courses/courseSlice";
import { useGetAllUserQuery } from "../../redux/features/user/userSlice";

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