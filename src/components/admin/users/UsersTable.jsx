/* eslint-disable react/prop-types */
import CButton from "../../../utils/CButton/CButton";
import { FaUserGear } from "react-icons/fa6";
import { FaUserGraduate } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa6";
import { useContext, useEffect } from "react";
import { useUpdateRoleMutation } from "../../../redux/features/user/user-api-slice";
import Swal from "sweetalert2";
import Loading from "../../../utils/CLoading/Loading";
import { AuthContext } from "../../../providers/AuthProvider";

const UsersTable = ({ data, refetch }) => {


    // //showing success message
    // useEffect(() => {
    //     if (deleteUsersIsSuccess) {
    //         Swal.fire(
    //             'User Deleted Successfully!',
    //             'Success!',
    //             'success'
    //         )
    //         refetch();
    //     }
    // }, [deleteUsersIsSuccess, refetch]);

    // //showing error message
    // useEffect(() => {
    //     if (deleteUsersIsError) {
    //         Swal.fire({
    //             icon: 'error',
    //             title: 'Oops...',
    //             text: 'User Not Deleted, Please try again...!',
    //         })
    //     }
    // }, [deleteUsersIsError]);

    // const handleDelete = (id) => {
    //     Swal.fire({
    //         title: "Are you sure?",
    //         text: "Once Deleted, you will not be able to revert this!",
    //         confirmButtonText: "Delete",
    //         showCancelButton: true,
    //     }).then( (result) => {
    //         if (result.isConfirmed) {
    //             deleteAuthUser()
    //             .then(async () => {
    //                 try {
    //                     await deleteUser(id)
    //                 }
    //                 catch (er) {
    //                     console.log(er);
    //                     return;
    //                 }
    //             }).catch((error) => {
    //                 Swal.fire({
    //                     icon: 'error',
    //                     title: 'Oops...',
    //                     text: 'User Not Deleted, Please try again...!',
    //                 })
    //                 console.log(error);
    //                 return;
    //             });

    //         }
    //     });

    // }

    const { user } = useContext(AuthContext)
    const [
        updateRole,
        { isLoading: updateRoleIsLoading, isSuccess: updateRoleIsSuccess, isError: updateRoleIsError },
    ] = useUpdateRoleMutation();

    //showing success message
    useEffect(() => {
        if (updateRoleIsSuccess) {
            refetch();
            Swal.fire(
                'Role updated Successfully!',
                'Success!',
                'success'
            )
        }
    }, [refetch, updateRoleIsSuccess]);

    //showing error message
    useEffect(() => {
        if (updateRoleIsError) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Role Not updated, Please try again...!',
            })
        }
    }, [updateRoleIsError]);

    if (updateRoleIsLoading) return <Loading />


    const handleRoleChange = async (id, roles) => {
        const data = {
            id,
            roles
        }

        try {
            await updateRole(data)?.unwrap();

        } catch (err) {
            console.log(err);
        }

    }


    return (
        <section className="mx-auto">

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Roles</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            data.map((singleUser, indx) => <tr key={indx} className={`${user.email === singleUser.email ? "opacity-50" : "opacity-100"}`}>
                                <td>{indx + 1}</td>
                                <td>
                                    <div className="avatar">
                                        <div className="w-12 h-10 rounded">
                                            <img src={singleUser.image} alt="singleUser Banner" />
                                        </div>
                                    </div>
                                </td>
                                <td>{singleUser?.name}</td>
                                <td>{singleUser?.email}</td>
                                <td>{singleUser?.roles}</td>
                                <td className="flex flex-col md:flex-row gap-2 justify-center items-center">

                                    {/* <Link to={`/dashboard/updateUser/${user?._id}`}>
                                        <CButton
                                            className={'bg-orange-400 text-white rounded-full p-2'}
                                        >
                                            <FaPenToSquare className="text-lg" />
                                        </CButton>
                                    </Link> */}

                                    {/* <CButton
                                        onClick={() => {
                                            setIndex(indx);
                                            handleDelete(`${user?._id}`);
                                        }}
                                        className={'bg-red-500 text-white rounded-full p-2'}
                                        loading={index === indx && deleteUsersIsLoading}
                                    >
                                        <RiDeleteBin2Fill className="text-lg" />
                                    </CButton> */}

                                    <CButton
                                        onClick={() => handleRoleChange(singleUser._id, "Admin")}
                                        className={'bg-green-500 text-white rounded-full'}
                                        style={{ padding: "1px 2px" }}
                                        disabled={(singleUser.roles === "Admin" || user.email === singleUser.email) ? true : false}
                                    >
                                        <div className="flex flex-col items-center ">
                                            <FaUserGear className="text-sm" />
                                            <span className="text-xs">Make Admin</span>
                                        </div>
                                    </CButton>
                                    <CButton
                                        onClick={() => handleRoleChange(singleUser._id, "Teacher")}
                                        className={'bg-sky-500 text-white rounded-full'}
                                        style={{ padding: "1px 2px" }}
                                        disabled={(singleUser.roles === "Teacher" || user.email === singleUser.email) ? true : false}
                                    >
                                        <div className="flex flex-col items-center ">
                                            <FaUserTie className="text-sm" />
                                            <span className="text-xs">Make Teacher</span>
                                        </div>
                                    </CButton>
                                    <CButton
                                        onClick={() => handleRoleChange(singleUser._id, "Student")}
                                        className={'bg-pink-500 text-white rounded-full'}
                                        style={{ padding: "1px 2px" }}
                                        disabled={(singleUser.roles === "Student" || user.email === singleUser.email) ? true : false}
                                    >
                                        <div className="flex flex-col items-center ">
                                            <FaUserGraduate className="text-sm" />
                                            <span className="text-xs">Make Student</span>
                                        </div>
                                    </CButton>

                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>

        </section>
    );
};

export default UsersTable;