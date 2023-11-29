import { useParams } from "react-router-dom";
import { popularCourses } from "../../../content/data";
import CContainer from "../../../utils/CContainer/CContainer";
import CButton from "../../../utils/CButton/CButton";

const SingleCourse = () => {
    const params = useParams();
    const course = popularCourses.find(course => course?._id === params?.id)

    return (
        <CContainer>
            <div
                key={course._id}
                className="w-full max-w-2xl mx-auto mt-10 border border-[#E6E6E6] rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500"
            >
                <img className="mx-auto mt-5" src={course.bannerURL} alt="" />
                <div className="p-5">
                    <h3 className="mt-3 font-bold text-xl">{course.title}</h3>
                    <p className="text-[#6C6B6B]">Instructor: {course.TName}</p>
                    <div className="flex items-center gap-2 mb-4">
                        <img className="mt-2" src="https://i.ibb.co/NYdVqZt/Group-24.png" alt="" />
                        <p className="mt-2">{course.rating}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Price: {course.price} $</p>
                        <p>Total Student: {course.totalstu}</p>
                    </div>
                    <p className="text-center">
                        Completed Student: {course.completedstu}
                    </p>
                    <CButton variant={"contained"}>Enroll Now</CButton>

                </div>
            </div>
        </CContainer>
    );
};

export default SingleCourse;