/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDeleteBlogMutation } from "../../../redux/features/blogs/blog-api-slice";
import Swal from "sweetalert2";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaPenToSquare } from "react-icons/fa6";
import { Link } from "react-router-dom";
import CButton from "../../../utils/CButton/CButton";

const BlogsTable = ({ data, refetch }) => {

    const [index, setIndex] = useState(null);

    const [
        deleteBlog,
        { isLoading: deleteBlogIsLoading, isSuccess: deleteBlogIsSuccess, isError: deleteBlogIsError },
    ] = useDeleteBlogMutation();

    //showing success message
    useEffect(() => {
        if (deleteBlogIsSuccess) {
            Swal.fire(
                'Blog Deleted Successfully!',
                'Success!',
                'success'
            )
            refetch();
        }
    }, [deleteBlogIsSuccess, refetch]);

    //showing error message
    useEffect(() => {
        if (deleteBlogIsError) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Blog Not Deleted, Please try again...!',
            })
        }
    }, [deleteBlogIsError]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Once Deleted, you will not be able to revert this!",
            confirmButtonText: "Delete",
            showCancelButton: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteBlog(id)
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
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            data?.map((blog, indx) => <tr key={indx}>
                                <td>{indx + 1}</td>
                                <td>
                                    <div className="avatar">
                                        <div className="w-12 h-10 rounded">
                                            <img src={blog.blogBanner} alt="blog Banner" />
                                        </div>
                                    </div>
                                </td>
                                <td>{blog?.title}</td>
                                {/* <td>{blog?.price} BDT</td>
                                <td>{blog?.rating}</td> */}
                                <td>{blog?.teacherName}</td>
                                <td>{blog?.teacherEmail}</td>
                                <td className="flex flex-col md:flex-row gap-2 justify-center items-center">

                                    <Link to={`/dashboard/updateBlog/${blog?._id}`}>
                                        <CButton
                                            className={'bg-orange-400 text-white rounded-full p-2'}
                                        >
                                            <FaPenToSquare className="text-lg" />
                                        </CButton>
                                    </Link>

                                    <CButton
                                        onClick={() => {
                                            setIndex(indx);
                                            handleDelete(`${blog?._id}`);
                                        }}
                                        className={'bg-red-500 text-white rounded-full p-2'}
                                        loading={index === indx && deleteBlogIsLoading}
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

export default BlogsTable;