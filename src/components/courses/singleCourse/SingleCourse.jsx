import { useParams } from "react-router-dom";
import CContainer from "../../../utils/CContainer/CContainer";
import CButton from "../../../utils/CButton/CButton";
import Loading from "../../../utils/CLoading/Loading";
import { useGetCourseByIdQuery } from "../../../redux/features/courses/courses-api-slice";
import useRole from "../../../hooks/useRole";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/features/cart/cartSlice";
import Swal from "sweetalert2";

const SingleCourse = () => {

    const params = useParams();
    const { isLoading, data: course, } = useGetCourseByIdQuery(params?.id)
    const [isRoleLoading, role] = useRole();
    const dispatch = useDispatch();

    return (
        <CContainer>
            {
                isLoading
                    ?
                    <Loading />
                    :
                    <div
                        className="w-full max-w-2xl mx-auto mt-10 border border-[#E6E6E6] rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500"
                    >
                        <img className="mx-auto mt-5" src={course?.bannerURL} alt="" />
                        <div className="p-5">
                            <h3 className="mt-3 font-bold text-xl">{course?.title}</h3>
                            <p className="text-[#6C6B6B]">Instructor: {course?.teacherName}</p>
                            <div className="flex items-center gap-2 mb-4">
                                <img className="mt-2" src="https://i.ibb.co/NYdVqZt/Group-24.png" alt="" />
                                <p className="mt-2">{course?.rating}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Price: {course?.price} $</p>
                                <p>Total Student: {course?.totalstu}</p>
                            </div>
                            <p className="text-center">
                                Completed Student: {course?.completedstu}
                            </p>

                            {
                                (!isRoleLoading && role == "Student")
                                &&
                                <CButton variant={"contained"} onClick={() => {
                                    dispatch(addToCart(course));
                                    Swal.fire(
                                        'Course Selected Successfully!',
                                        'Success!',
                                        'success'
                                    )
                                }}
                                >
                                    Enroll Now
                                </CButton>
                            }
                        </div>
                    </div>
            }
        </CContainer>
    );
};

export default SingleCourse;