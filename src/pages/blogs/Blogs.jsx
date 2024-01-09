import { Link } from "react-router-dom";
import CButton from "../../utils/CButton/CButton";
import CSkeleton from "../../utils/CSkeleton/CSkeleton";
import { useGetAllBlogQuery } from "../../redux/features/blogs/blog-api-slice";
import WarningAllert from "../../shared/WarningAllert";
import { useEffect } from "react";

const Blogs = () => {

    const { isLoading, isError, data: blogs, refetch } = useGetAllBlogQuery();
    console.log(isLoading);
    console.log(blogs);
    console.log(refetch);
    console.log(isError);

    useEffect(()=>{
        refetch();
    },[refetch])

    if(isError) return <WarningAllert message={'Blogs Not Found..!, Something went Wrong Try Again.'}/>

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-7 p-2 mx-5 h-auto rounded">
                {
                    isLoading
                    ?
                    <>
                        <CSkeleton />
                        <CSkeleton />
                        <CSkeleton />
                        <CSkeleton />
                    </>
                    :
                    blogs.map(blog => <div
                        key={blog?._id}
                        className="border border-[#E6E6E6] rounded-lg hover:shadow-xl transition-all duration-500">
                        <img className="w-full md:h-52 overflow-hidden" src={blog?.blogBanner} alt="" />
                        <div className="p-5">
                            <h3 className="font-bold text-lg h-20">{blog?.title}</h3>
                            {/* <p className="text-[#6C6B6B]">Writer: {blog.TName}</p> */}
                            <p className="text-[#6C6B6B]">{blog?.description.slice(0, 120) + "..."}</p>

                            <p className="mt-2">Likes: {blog?.NoOfLike}</p>

                            <Link to={`${blog?._id}`}>
                                <CButton className="mt-5 bottom-0" variant={"outline"} fullWidth={true}>Read More</CButton>
                            </Link>

                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Blogs;