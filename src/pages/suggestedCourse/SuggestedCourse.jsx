import { useContext, useEffect } from "react";
import { useGetAllSuggestedCourseQuery } from "../../redux/features/courses/courses-api-slice";
import { AuthContext } from "../../providers/AuthProvider";
import { Link } from "react-router-dom";
import CButton from "../../utils/CButton/CButton";
import CSkeleton from "../../utils/CSkeleton/CSkeleton";
import WarningAllert from "../../shared/WarningAllert";

const SuggestedCourse = () => {

    const { user } = useContext(AuthContext)
    const { isLoading, data: courses, refetch } = useGetAllSuggestedCourseQuery(user?.email);

    useEffect(() => {
        refetch();
    }, [refetch])

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-7 p-2 mx-5">
                {
                    isLoading
                        ?
                        <>
                            <CSkeleton />
                            <CSkeleton />
                            <CSkeleton />
                        </>
                        :
                        <div className="">
                            {
                                courses?.length !== 0
                                    ?
                                    courses.map(course => <div
                                        key={course?._id}
                                        className="border border-[#E6E6E6] rounded-lg hover:shadow-xl transition-all duration-500">
                                        <img className="w-full md:h-52" src={course?.bannerURL} alt="" />
                                        <div className="p-5">
                                            <h3 className="font-bold text-lg h-12">{course?.title}</h3>
                                            <p className="text-[#6C6B6B]">Instructor: {course?.teacherName}</p>
                                            <div className="flex items-center gap-2 mb-4">
                                                <img className="mt-2" src="https://i.ibb.co/NYdVqZt/Group-24.png" alt="" />
                                                <p className="mt-2">{course?.rating}</p>
                                            </div>
                                            <Link to={`/courses/${course?._id}`}>
                                                <CButton variant={"outline"} fullWidth={true}>View Details</CButton>
                                            </Link>

                                        </div>
                                    </div>)
                                    :
                                    <WarningAllert message={'Nothing Matched regardin your interest'} />
                            }
                        </div>

                }
            </div>
        </div>
    );
};

export default SuggestedCourse;