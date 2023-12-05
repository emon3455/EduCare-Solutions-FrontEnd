import { Link } from "react-router-dom";
import { blogsData } from "../../content/data";
import CPageBanner from "../../utils/CBanner/CPageBanner";
import CButton from "../../utils/CButton/CButton";

const Blogs = () => {
    return (
        <div>
            <CPageBanner title={`Blogs`}/>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-7 p-2 mx-5 h-auto">
                {
                    blogsData.map(blog => <div
                        key={blog._id}
                        className="border border-[#E6E6E6] rounded-lg hover:shadow-xl transition-all duration-500">
                        <img className="w-full md:h-52" src={blog.blogBanner} alt="" />
                        <div className="p-5">
                            <h3 className="mt-3 font-bold text-xl">{blog.title}</h3>
                            {/* <p className="text-[#6C6B6B]">Writer: {blog.TName}</p> */}
                            <p className="text-[#6C6B6B]">{blog.description}</p>
                            <div className="flex items-center gap-2 mb-4">
                                <img className="mt-2" src="https://i.ibb.co/NYdVqZt/Group-24.png" alt="" />
                                <p className="mt-2">{blog.rating}</p>
                            </div>
                            <Link to={`courses/${blog._id}`}>
                                <CButton className="mt-5 bottom-0" variant={"outline"} fullWidth={true}>View Details</CButton>
                            </Link>

                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Blogs;