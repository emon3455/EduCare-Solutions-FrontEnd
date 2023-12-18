import { useParams } from "react-router-dom";
import CContainer from "../../../utils/CContainer/CContainer";
import { BiSolidLike } from "react-icons/bi";
import { useContext, useEffect } from "react";
import Loading from "../../../utils/CLoading/Loading";
import { useGetBlogByIdQuery, useLikeBlogMutation } from "../../../redux/features/blogs/blog-api-slice";
import ErrorAllert from "../../../shared/ErrorAllert";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";

const SingleBlog = () => {

    const { user } = useContext(AuthContext)
    const params = useParams();
    const { isLoading, isError, data: blog, refetch } = useGetBlogByIdQuery(params?.id)

    const [
        likeBlog,
        { isLoading: likeBlogIsLoading, isSuccess: likeBlogIsSuccess, isError: likeBlogIsError, },
    ] = useLikeBlogMutation();

    //showing success message
    useEffect(() => {
        if (likeBlogIsSuccess) {
            refetch()
        }
    }, [ refetch, likeBlogIsSuccess]);

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
                                        blog?.likedUsers.includes(user?.email)
                                            ?
                                            <span onClick={() => handleRemoveLike(blog.NoOfLike, blog._id)}>
                                                <BiSolidLike className="text-2xl cursor-pointer text-sky-600" />
                                            </span>
                                            :
                                            <span onClick={() => handleAddLike(blog.NoOfLike, blog._id)}>
                                                <BiSolidLike className="text-2xl cursor-pointer text-gray-500 " />
                                            </span>
                                    }
                                    <span>{blog?.NoOfLike}</span>

                                </div>
                                <p className="text-[#6C6B6B]"><span className="font-semibold">Author:</span> {blog?.teacherName}</p>
                            </div>
                            <hr />
                        </div>
                    </div>
            }
        </CContainer>
    );
};

export default SingleBlog;