/* eslint-disable react/prop-types */

import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaPenToSquare } from "react-icons/fa6";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import CButton from "../../../utils/CButton/CButton";
import { useDeleteCourseMutation } from "../../../redux/features/courses/courses-api-slice";
import { Link } from "react-router-dom";

const CoursesTable = ({ data, refetch }) => {
  const [index, setIndex] = useState(null);

  const [
    deleteCourse,
    {
      isLoading: deleteCourseIsLoading,
      isSuccess: deleteCourseIsSuccess,
      isError: deleteCourseIsError,
    },
  ] = useDeleteCourseMutation();

  //showing success message
  useEffect(() => {
    if (deleteCourseIsSuccess) {
      Swal.fire("Course Deleted Successfully!", "Success!", "success");
      refetch();
    }
  }, [deleteCourseIsSuccess, refetch]);

  //showing error message
  useEffect(() => {
    if (deleteCourseIsError) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Course Not Deleted, Please try again...!",
      });
    }
  }, [deleteCourseIsError]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once Deleted, you will not be able to revert this!",
      confirmButtonText: "Delete",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteCourse(id);
        } catch (er) {
          console.log(er);
        }
      }
    });
  };

  return (
    <section className="mx-auto">
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>Banner</th>
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Rating</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((course, indx) => (
              <tr key={indx}>
                <td>{indx + 1}</td>
                <td>
                  <div className="avatar">
                    <div className="w-12 h-10 rounded">
                      <img src={course.bannerURL} alt="course Banner" />
                    </div>
                  </div>
                </td>
                <td>{course?.title}</td>
                <td>{course?.categoryName}</td>
                <td>{course?.price} BDT</td>
                <td>{course?.rating.toFixed(1)}</td>
                <td className="flex flex-col md:flex-row gap-2 justify-center items-center">
                  <Link to={`/dashboard/updateCourse/${course?._id}`}>
                    <CButton
                      className={"bg-orange-400 text-white rounded-full p-2"}
                    >
                      <FaPenToSquare className="text-lg" />
                    </CButton>
                  </Link>

                  <CButton
                    onClick={() => {
                      setIndex(indx);
                      handleDelete(`${course?._id}`);
                    }}
                    className={"bg-red-500 text-white rounded-full p-2"}
                    loading={index === indx && deleteCourseIsLoading}
                  >
                    <RiDeleteBin2Fill className="text-lg" />
                  </CButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default CoursesTable;
