/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useDeleteSessionMutation } from "../../../redux/features/sessions/session-api-slice";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaPenToSquare } from "react-icons/fa6";
import { Link } from "react-router-dom";
import CButton from "../../../utils/CButton/CButton";


const SessionsTable = ({ data, refetch }) => {

    const [index, setIndex] = useState(null);

    const [
        deleteSession,
        { isLoading: deleteSessionIsLoading, isSuccess: deleteSessionIsSuccess, isError: deleteSessionIsError },
    ] = useDeleteSessionMutation();

    //showing success message
    useEffect(() => {
        if (deleteSessionIsSuccess) {
            Swal.fire(
                'Session Deleted Successfully!',
                'Success!',
                'success'
            )
            refetch();
        }
    }, [deleteSessionIsSuccess, refetch]);

    //showing error message
    useEffect(() => {
        if (deleteSessionIsError) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Session Not Deleted, Please try again...!',
            })
        }
    }, [deleteSessionIsError]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Once Deleted, you will not be able to revert this!",
            confirmButtonText: "Delete",
            showCancelButton: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteSession(id)
                }
                catch (er) {
                    console.log(er);
                }
            }
        });

    }

    return (
        <section className="mx-auto">

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Banner</th>
                            <th>Title</th>
                            <th>Teacher Name</th>
                            <th>Teacher Email</th>
                            <th>Session Date</th>
                            <th>Session Platform</th>
                            <th>Session Link</th>
                            <th>Session Time</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            data?.map((session, indx) => <tr key={indx}>
                                <td>{indx + 1}</td>
                                <td>
                                    <div className="avatar">
                                        <div className="w-12 h-10 rounded">
                                            <img src={session.sessionBanner} alt="session Banner" />
                                        </div>
                                    </div>
                                </td>
                                <td>{session?.title}</td>
                                <td>{session?.teacherName}</td>
                                <td>{session?.teacherEmail}</td>
                                <td>{session?.sessionDate}</td>
                                <td>{session?.sessionPlatform}</td>
                                <td>{session?.sessionLink}</td>
                                <td>{session?.sessionTime}</td>
                                <td className="flex flex-col md:flex-row gap-2 justify-center items-center">

                                    <Link to={`/dashboard/updateSession/${session?._id}`}>
                                        <CButton
                                            className={'bg-orange-400 text-white rounded-full p-2'}
                                        >
                                            <FaPenToSquare className="text-lg" />
                                        </CButton>
                                    </Link>

                                    <CButton
                                        onClick={() => {
                                            setIndex(indx);
                                            handleDelete(`${session?._id}`);
                                        }}
                                        className={'bg-red-500 text-white rounded-full p-2'}
                                        loading={index === indx && deleteSessionIsLoading}
                                    >
                                        <RiDeleteBin2Fill className="text-lg" />
                                    </CButton>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>

            {/* <CModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        title="Update Course"
        width={"w-full md:w-4/5 lg:w-1/2"}
    >
        <UpdateCourse
            setOpenModal={setOpenModal}
            dataForUpdate={dataForUpdate || {}}
            refetch={refetch}
            categorys={categorys || []}
        />
    </CModal> */}

        </section>
    );
};

export default SessionsTable;