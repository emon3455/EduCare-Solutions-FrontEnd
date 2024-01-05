import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/lazy";
import CCard from "../../../../utils/CCard/CCard";
import CButton from "../../../../utils/CButton/CButton";
import CContainer from "../../../../utils/CContainer/CContainer";
import { useGetEnrolledCourseByIdQuery } from "../../../../redux/features/payments/payments-api-slice";
import Loading from "../../../../utils/CLoading/Loading";
import ErrorAllert from "../../../../shared/ErrorAllert";
import { useEffect } from "react";

const Play = () => {
  const params = useParams();
  const {
    isLoading,
    data: classes,
    isError,
    refetch,
  } = useGetEnrolledCourseByIdQuery(params?.id);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleComplete = () => {};
  const handleRate = () => {};

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
              <div className="flex items-center gap-2 mb-4">
                <img
                  className="mt-2"
                  src="https://i.ibb.co/NYdVqZt/Group-24.png"
                  alt=""
                />
                <p className="mt-2">{classes?.rating}</p>
              </div>
            </div>
            {
                classes?.isCompleted
                ?
                <CButton variant={"contained"} onClick={handleRate} disabled={classes?.isRated}>
                    Rate Us
                </CButton>
                :
                <CButton variant={"contained"} onClick={handleComplete}>
                    Complete
                </CButton>
            }
          </div>
          <hr />
        </CCard>
      </CContainer>
    </main>
  );
};

export default Play;
