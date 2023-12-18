import { useParams } from "react-router-dom";
import CContainer from "../../../utils/CContainer/CContainer";
import { BiSolidLike } from "react-icons/bi";
import { useContext, useEffect, useState } from "react";
import Loading from "../../../utils/CLoading/Loading";
import { useGetBlogByIdQuery, useLikeBlogMutation } from "../../../redux/features/blogs/blog-api-slice";
import ErrorAllert from "../../../shared/ErrorAllert";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";
import CModal from "../../../utils/CModal/CModal";
import WarningAllert from "../../../shared/WarningAllert";

const SingleBlog = () => {

    const params = useParams();
    const { user } = useContext(AuthContext)
    const [openModal, setOpenModal] = useState(false)
    const [isLike, setIsLike] = useState(false);
    const { isLoading, isError, data: blog, refetch } = useGetBlogByIdQuery(params?.id)

    const [
        likeBlog,
        { isLoading: likeBlogIsLoading, isSuccess: likeBlogIsSuccess, isError: likeBlogIsError, },
    ] = useLikeBlogMutation();

    useEffect(() => {
        const likedUserEmails = blog?.likedUsers.map(user => user.email) || [];
        setIsLike(likedUserEmails.includes(user.email) ? true : false)
    }, [blog, setIsLike, user])

    //showing success message
    useEffect(() => {
        if (likeBlogIsSuccess) {
            refetch()
        }
    }, [refetch, likeBlogIsSuccess]);

    //showing error message
    useEffect(() => {
        if (likeBlogIsError) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Operation Unsuccessful, Please try again...!',
            })
        }
    }, [likeBlogIsError]);

    if (isLoading) return <Loading />
    if (likeBlogIsLoading) return <Loading />


    const handleAddLike = async (likes, id) => {
        const updatedLike = parseInt(likes + 1);
        const data = {
            id: id,
            email: user?.email,
            noOfLike: updatedLike
        }
        try {
            await likeBlog(data)?.unwrap();
        }
        catch (er) {
            console.log(er);
        }

    }

    const handleRemoveLike = async (likes, id) => {

        const updatedLike = parseInt(likes - 1);
        const data = {
            id: id,
            email: user?.email,
            noOfLike: updatedLike
        }
        try {
            await likeBlog(data)?.unwrap();
        }
        catch (er) {
            console.log(er);
        }
    }

    return (
        <CContainer>
            {
                isError && <ErrorAllert message={'Something went wrong...!!!'} />
            }
            {
                isLoading
                    ?
                    <Loading />
                    :
                    <div
                        className="w-full max-w-2xl mx-auto mt-10 border border-[#E6E6E6] rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500"
                    >
                        <img className="mx-auto w-full md:w-3/5 h-64" src={blog?.blogBanner} alt="" />
                        <div className="p-5">
                            <h3 className="my-3 font-bold text-xl">{blog?.title}</h3>
                            <p className="mb-2">
                                {blog?.description}
                            </p>
                            <hr />
                            <div className="flex justify-between py-2">
                                <div className="flex gap-2">

                                    <span>Like:</span>
                                    {
                                        isLike
                                            ?
                                            <span onClick={() => handleRemoveLike(blog.NoOfLike, blog._id)}>
                                                <BiSolidLike className="text-2xl cursor-pointer text-sky-600" />
                                            </span>
                                            :
                                            <span onClick={() => handleAddLike(blog.NoOfLike, blog._id)}>
                                                <BiSolidLike className="text-2xl cursor-pointer text-gray-500 " />
                                            </span>
                                    }

                                    <span onClick={() => setOpenModal(true)} className="cursor-pointer">{blog?.NoOfLike}</span>

                                </div>
                                <p className="text-[#6C6B6B]"><span className="font-semibold">Author:</span> {blog?.teacherName}</p>
                            </div>
                            <hr />
                        </div>
                    </div>
            }
            <CModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                title="Liked User"
                width={"w-full sm:w-1/2 md:w-2/5 lg:w-1/3"}
                height={"h-2/3 sm:h-1/2 md:h-3/5 lg:h-2/5"}
            >
                {
                    blog?.likedUsers?.length == 0
                        ?
                        <WarningAllert message={'This Blog has no like yet..!!!'} />
                        :
                        blog?.likedUsers.map((user, index) => <div key={index} className="mb-1">
                            <div className="flex gap-2 items-center mb-1">
                                <div className="avatar">
                                    <div className="w-10 h-10 rounded-full">
                                        <img src={user?.image} className="w-10 h-10 rounded-full" />
                                    </div>
                                </div>
                                <h2>{user?.name}</h2>
                            </div>
                            <hr />
                        </div>)
                }

            </CModal>
        </CContainer>
    );
};

export default SingleBlog;