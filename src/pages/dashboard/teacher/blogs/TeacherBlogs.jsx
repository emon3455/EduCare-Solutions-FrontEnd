import { useContext, useEffect, useState } from "react";
import useCategory from "../../../../hooks/useCategory";
import useRole from "../../../../hooks/useRole";
import { useGetAllMyBlogQuery } from "../../../../redux/features/blogs/blog-api-slice";
import Loading from "../../../../utils/CLoading/Loading";
import ErrorAllert from "../../../../shared/ErrorAllert";
import CButton from "../../../../utils/CButton/CButton";
import CCard from "../../../../utils/CCard/CCard";
import WarningAllert from "../../../../shared/WarningAllert";
import BlogsTable from "../../../../components/admin/blogs/BlogsTable";
import CModal from "../../../../utils/CModal/CModal";
import AddBlog from "../../../../components/admin/blogs/addBlog/AddBlog";
import { AuthContext } from "../../../../providers/AuthProvider";


const TeacherBlogs = () => {
    const { user } = useContext(AuthContext);
    const [categoryIsLoading, categorys] = useCategory();
    const [roleIsLoading, role] = useRole();
    const [open, setOpen] = useState(false);

    const { isLoading: blogsIsLoading, isError: blogsIsError, data: allBlogs, refetch } = useGetAllMyBlogQuery({
        email: user?.email
    },
        {
            refetchOnMountOrArgChange: true,
        }
    );

    useEffect(() => {
        refetch()
    }, [refetch]);

    if (roleIsLoading) return <Loading />
    if (categoryIsLoading) return <Loading />
    if (blogsIsError) return <ErrorAllert message={'Error! Something Went Wrong...!!!'} />

    return (
        <main className="p-2 lg:p-4">
            <CCard title={'My Blogs'} secondary={<CButton onClick={() => setOpen(true)} variant={'contained'}>Add Blog</CButton>}>
                {
                    blogsIsLoading && <Loading />
                }
                {
                    allBlogs?.length == 0
                        ?
                        <WarningAllert message={'No Blog Data Found...!!!'} />
                        :
                        <BlogsTable data={allBlogs || []} refetch={refetch} categorys={categorys || []} />
                }
            </CCard>

            <CModal
                open={open}
                onClose={() => setOpen(false)}
                title="Add Blog"
                width={"w-full md:w-4/5 lg:w-1/2"}
            >
                <AddBlog setOpen={setOpen} refetch={refetch} categorys={categorys || []} role={role} />
            </CModal>
        </main>
    );
};

export default TeacherBlogs;