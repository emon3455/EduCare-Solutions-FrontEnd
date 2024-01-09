import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../../../redux/features/cart/cartSlice";
import CButton from "../../../../utils/CButton/CButton";
import CCard from "../../../../utils/CCard/CCard";
import WarningAllert from "../../../../shared/WarningAllert";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useGetEnrolledCourseQuery } from "../../../../redux/features/payments/payments-api-slice";
import Loading from "../../../../utils/CLoading/Loading";
import Swal from "sweetalert2";

const SelectedCourse = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const selectedCourse =
    cart.filter((classes) => classes.selectedUserEmail == user?.email) || [];
  const {
    isLoading,
    data: courses,
    isError,
    refetch,
  } = useGetEnrolledCourseQuery(user?.email);

  const dispatch = useDispatch();

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isError)
    return <WarningAllert message={"Something Went Wrong...!!, Try Again."} />;

  if (isLoading) {
    return <Loading />;
  }

  const handlePayment = (id) => {
    const isEnrolled = courses.find((obj) => obj?.classId == id);
    if (isEnrolled) {
      Swal.fire("Course Is Already Enrolled", "Warning!", "warning");
      return;
    } else {
      navigate(`${id}`);
    }
  };

  return (
    <div className="p-4">
      <CCard title={"Selected Courses"}>
        <div className="">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Ratings</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedCourse.length == 0 && (
                  <WarningAllert
                    message={"Nothing To show! Please Add some Item First"}
                  />
                )}
                {selectedCourse &&
                  selectedCourse.map((item) => (
                    <tr key={item._id}>
                      <td>{item?.title}</td>
                      <td>
                        <div className="avatar">
                          <div className="w-12 h-10 rounded">
                            <img src={item?.bannerURL} alt="course Banner" />
                          </div>
                        </div>
                      </td>
                      <td>{item?.price} $</td>
                      <td>{item?.rating.toFixed(2)}</td>
                      <td>
                        <div className="flex flex-col lg:flex-row gap-2">
                          <CButton
                            onClick={() => dispatch(removeFromCart(item?._id))}
                            className={"bg-red-500 text-white rounded-full p-2"}
                          >
                            <FaTrash className="text-lg" />
                          </CButton>
                          <CButton
                            variant={"contained"}
                            onClick={() => handlePayment(item._id)}
                          >
                            Pay
                          </CButton>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </CCard>
    </div>
  );
};

export default SelectedCourse;
