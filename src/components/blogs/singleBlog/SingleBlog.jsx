import { useParams } from "react-router-dom";
import { blogsData } from "../../../content/data";
import CContainer from "../../../utils/CContainer/CContainer";
import { BiSolidLike } from "react-icons/bi";
import { useState } from "react";

const SingleBlog = () => {

    const [like, setLike] = useState(false)
    const params = useParams();
    const blog = blogsData.find(blog => blog?._id === params?.id);

    return (
        <CContainer>
            <div
                className="w-full max-w-2xl mx-auto mt-10 border border-[#E6E6E6] rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500"
            >
                <img className="mx-auto w-full md:w-3/5 h-64" src={blog?.blogBanner} alt="" />
                <div className="p-5">
                    <h3 className="my-3 font-bold text-xl">{blog?.title}</h3>
                    <p className="mb-2">
                        {blog.description}
                    </p>
                    <hr />
                    <div className="flex justify-between py-2">
                        <div className="flex gap-2">

                            <span>Like:</span>
                            {
                                like
                                    ?
                                    <span onClick={() => setLike(false)}>
                                        <BiSolidLike className="text-2xl cursor-pointer text-sky-600" />
                                    </span>
                                    :
                                    <span onClick={() => setLike(true)}>
                                        <BiSolidLike className="text-2xl cursor-pointer text-gray-500" />
                                    </span>
                            }
                            <span>{blog?.NoOfLike}</span>

                        </div>
                        <p className="text-[#6C6B6B]"><span className="font-semibold">Author:</span> {blog.TName}</p>
                    </div>
                    <hr />
                </div>
            </div>
        </CContainer>
    );
};

export default SingleBlog;