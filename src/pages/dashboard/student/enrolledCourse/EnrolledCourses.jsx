import { useContext, useEffect } from "react";
import { AuthContext } from "../../../../providers/AuthProvider";
import { useGetEnrolledCourseQuery } from "../../../../redux/features/payments/payments-api-slice";
import WarningAllert from "../../../../shared/WarningAllert";
import CCard from "../../../../utils/CCard/CCard";
import CSkeleton from "../../../../utils/CSkeleton/CSkeleton";
import { Link } from "react-router-dom";

const EnrolledCourses = () => {
  const { user } = useContext(AuthContext);
  const {
    isLoading,
    data: courses,
    isError,
    refetch,
  } = useGetEnrolledCourseQuery(user?.email);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isError)
    return (
      <WarningAllert
        message={
          "Payment History Not Available..!, Something went Wrong Try Again."
        }
      />
    );

  return (
    <div className="p-2">
      <CCard title={"Enrolled Course"}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-7 p-2">
          {isLoading ? (
            <>
              <CSkeleton />
              <CSkeleton />
              <CSkeleton />
            </>
          ) : courses.length > 0 ? (
            courses.map((course) => (
              <Link key={course?._id} to={`/play/${course?._id}`}>
                <div className="border border-[#E6E6E6] rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 h-[300px]">
                  <img
                    className="w-full md:h-2/3"
                    src={course?.bannerURL}
                    alt=""
                  />
                  <div className="p-2">
                    <h3 className="mt-3 font-bold text-xl">{course?.title}</h3>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-3">
              <WarningAllert
                message={
                  "No Enroll Course Found...!!! Please Enroll Any Course First."
                }
              />
            </div>
          )}
        </div>
      </CCard>
    </div>
  );
};

export default EnrolledCourses;
