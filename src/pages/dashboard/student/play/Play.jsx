import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/lazy";
import CCard from "../../../../utils/CCard/CCard";
import CButton from "../../../../utils/CButton/CButton";
import CContainer from "../../../../utils/CContainer/CContainer";
import { useGetEnrolledCourseByIdQuery } from "../../../../redux/features/payments/payments-api-slice";
import Loading from "../../../../utils/CLoading/Loading";
import ErrorAllert from "../../../../shared/ErrorAllert";
import { useEffect, useState } from "react";
import {
  useCompleteCourseMutation,
  useRateCourseMutation,
} from "../../../../redux/features/courses/courses-api-slice";
import Swal from "sweetalert2";
import CModal from "../../../../utils/CModal/CModal";
import CInput from "../../../../utils/CInput/CInput";

const Play = () => {
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");

  const {
    isLoading,
    data: classes,
    isError,
    refetch,
  } = useGetEnrolledCourseByIdQuery(params?.id);

  const [
    completeCourse,
    {
      isLoading: completeIsLoading,
      isSuccess: completeIsSuccess,
      isError: completeIsError,
    },
  ] = useCompleteCourseMutation();

  const [
    rateCourse,
    {
      isLoading: rateCourseIsLoading,
      isSuccess: rateCourseIsSuccess,
      isError: rateCourseIsError,
    },
  ] = useRateCourseMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  //showing complete success message
  useEffect(() => {
    if (completeIsSuccess) {
      Swal.fire("Course Completed Successfully!", "Success!", "success");
      refetch();
    }
  }, [completeIsSuccess, refetch]);

  //showing complete error message
  useEffect(() => {
    if (completeIsError) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Course Not Completed, Please try again...!",
      });
    }
  }, [completeIsError]);

  //showing rate success message
  useEffect(() => {
    if (rateCourseIsSuccess) {
      Swal.fire("Course Rated Successfully!", "Success!", "success");
      refetch();
      setOpen(false);
      setRating("");
    }
  }, [rateCourseIsSuccess, refetch]);

  //showing complete error message
  useEffect(() => {
    if (rateCourseIsError) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Course Not Rated, Please try again...!",
      });
    }
  }, [rateCourseIsError]);

  const handleComplete = async (classes) => {
    const data = { id: classes?._id, classId: classes?.classId };
    try {
      await completeCourse(data)?.unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  const handleRate = async() => {
    if (!rating) {
        setError("Rating is required");
        return;
    }
    const data = {
        id: classes?._id, 
        classId: classes?.classId,
        rating: rating
    }
    try {
        await rateCourse(data)?.unwrap();
      } catch (err) {
        console.log(err);
      }
  };

  if (isLoading) return <Loading />;

  if (isError)
    return (
      <ErrorAllert
        message={"Course Not found..!!!, Something went wrong. Try again"}
      />
    );

  return (
    <main className="p-2">
      <CContainer>
        <CCard>
          <ReactPlayer
            url={classes.videoURL}
            controls
            width="100%"
            height="500px"
            config={{
              youtube: {
                playerVars: { showinfo: 1 },
              },
            }}
            playing
            playbackRate={1}
            volume={1}
            muted={false}
            loop={false}
          />
          <hr />
          <div className="flex justify-between items-center">
            <div className="">
              <h2 className="text-xl lg:text-2xl font-semibold mt-5">
                <span className="text-violet-500">Title:</span> {classes?.title}
              </h2>
              <p>
                <span className="font-semibold">Instructor:</span>{" "}
                <span className="text-violet-500 font-semibold">
                  {classes?.teacherName}
                </span>
              </p>
            </div>
            <div className="">
              {classes?.isCompleted ? (
                <CButton
                  variant={"contained"}
                  onClick={() => setOpen(true)}
                  disabled={classes?.isRated}
                  loading={rateCourseIsLoading}
                >
                  Rate Course
                </CButton>
              ) : (
                <CButton
                  variant={"contained"}
                  onClick={() => handleComplete(classes)}
                  disabled={classes?.isCompleted}
                  loading={completeIsLoading ? true : false}
                >
                  Complete
                </CButton>
              )}
            </div>
          </div>
          <hr />
        </CCard>
      </CContainer>

      <CModal
        open={open}
        onClose={() => setOpen(false)}
        title="Rate the Course you have completed."
      >
        <h2 className="text-2xl font-bold text-center">Rate Now...!!!</h2>
        <div className="">
          <img
            className="mx-auto my-2"
            src="https://i.ibb.co/NYdVqZt/Group-24.png"
            alt=""
          />
        </div>
        <div className="my-5">
          <div className="mb-3">
            <CInput
              onChange={(e) => {
                if (e.target.value) {
                  setError("");
                }
                setRating(e.target.value);
              }}
              id="rating"
              type="number"
              label="Rating*"
            />
          </div>
          <p className="text-xs text-red-600 text-center mb-3">{error}</p>
          <CButton onClick={handleRate} variant={'contained'} loading={rateCourseIsLoading}>
            Submit
          </CButton>
        </div>
      </CModal>
    </main>
  );
};

export default Play;
