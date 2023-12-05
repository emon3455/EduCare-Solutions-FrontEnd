import { Link } from "react-router-dom";
import { popularCourses } from "../../content/data";
import CButton from "../../utils/CButton/CButton";
import CPageBanner from "../../utils/CBanner/CPageBanner";

const Courses = () => {
    return (
        <div>
            <CPageBanner title={`Courses`}/>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-7 p-2 mx-5">
                {
                    popularCourses.map(course => <div
                        key={course._id}
                        className="border border-[#E6E6E6] rounded-lg hover:shadow-xl transition-all duration-500">
                        <img className="w-full md:h-52" src={course.bannerURL} alt="" />
                        <div className="p-5">
                            <h3 className="mt-3 font-bold text-xl">{course.title}</h3>
                            <p className="text-[#6C6B6B]">Instructor: {course.TName}</p>
                            <div className="flex items-center gap-2 mb-4">
                                <img className="mt-2" src="https://i.ibb.co/NYdVqZt/Group-24.png" alt="" />
                                <p className="mt-2">{course.rating}</p>
                            </div>
                            <Link to={`courses/${course._id}`}>
                                <CButton variant={"outline"} fullWidth={true}>View Details</CButton>
                            </Link>

                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Courses;