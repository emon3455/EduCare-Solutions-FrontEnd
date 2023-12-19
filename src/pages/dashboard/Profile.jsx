import { useContext, useEffect } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useDeleteUserMutation, useGetUserRoleByEmailQuery } from "../../redux/features/user/user-api-slice";
import Loading from "../../utils/CLoading/Loading";
import UserDetails from "../../components/UserDetails";
import CCard from "../../utils/CCard/CCard";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import CButton from "../../utils/CButton/CButton";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaPenToSquare } from "react-icons/fa6";


const Profile = () => {

    const { user, deleteAuthUser } = useContext(AuthContext);
    const { isLoading, data, refetch } = useGetUserRoleByEmailQuery(user?.email);

    const [
        deleteUser,
        { isLoading: deleteUserIsLoading, isSuccess: deleteUserIsSuccess, isError: deleteUserIsError },
    ] = useDeleteUserMutation();

    //showing success message
    useEffect(() => {
        if (deleteUserIsSuccess) {
            Swal.fire(
                'User Deleted Successfully!',
                'Success!',
                'success'
            )
            refetch();
        }
    }, [deleteUserIsSuccess, refetch]);

    //showing error message
    useEffect(() => {
        if (deleteUserIsError) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'User Not Deleted, Please try again...!',
            })
        }
    }, [deleteUserIsError]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Once Deleted, you will not be able to revert this!",
            confirmButtonText: "Delete",
            showCancelButton: true,
        }).then( (result) => {
            if (result.isConfirmed) {
                deleteAuthUser()
                .then(async () => {
                    try {
                        await deleteUser(id)
                    }
                    catch (er) {
                        console.log(er);
                        return;
                    }
                }).catch((error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'User Not Deleted, Please try again...!',
                    })
                    console.log(error);
                    return;
                });

            }
        });

    }

    if(deleteUserIsLoading) return <Loading />

    return (
        <div>
            <CCard
                title={'My Profile'}
                secondary={
                    <div className="flex gap-2">
                        <Link to={`/dashboard/updateUser/${data?._id}`}>
                            <CButton
                                className={'bg-orange-400 text-white rounded-full p-2'}
                            >
                                <FaPenToSquare className="text-lg" /> Update Info
                            </CButton>
                        </Link>

                        <CButton
                            onClick={() => handleDelete(`${data?._id}`)}
                            className={'bg-red-500 text-white rounded-full p-2'}
                            loading={deleteUserIsLoading}
                        >
                            <RiDeleteBin2Fill className="text-lg" /> Delete Account
                        </CButton>
                    </div>
                }
            >
                {
                    isLoading
                        ?
                        <Loading />
                        :
                        <UserDetails user={data} />
                }
            </CCard>
        </div>
    );
};

export default Profile;