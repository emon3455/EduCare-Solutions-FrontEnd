import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../providers/AuthProvider";
import { useGetAllMyCourseQuery } from "../../../../redux/features/courses/courses-api-slice";
import useCategory from "../../../../hooks/useCategory";
import useRole from "../../../../hooks/useRole";
import Loading from "../../../../utils/CLoading/Loading";
import ErrorAllert from "../../../../shared/ErrorAllert";
import CCard from "../../../../utils/CCard/CCard";
import CButton from "../../../../utils/CButton/CButton";
import CoursesTable from "../../../../components/admin/courses/CoursesTable";
import WarningAllert from "../../../../shared/WarningAllert";
import CModal from "../../../../utils/CModal/CModal";
import AddCourses from "../../../../components/admin/courses/addCourse/AddCourses";

const TeacherCourses = () => {

    const { user } = useContext(AuthContext);
    const [categoryIsLoading, categorys] = useCategory();
    const [roleIsLoading, role] = useRole()
    const [open, setOpen] = useState(false);

    const { isLoading: coursesIsLoading, isError: coursesIsError, data: allCourses, refetch } =
        useGetAllMyCourseQuery({
            email: user?.email
        },
            {
                refetchOnMountOrArgChange: true,
            }
        )

    useEffect(() => {
        refetch()
    }, [refetch]);

    if (roleIsLoading) return <Loading />
    if (categoryIsLoading) return <Loading />
    if (coursesIsLoading) return <Loading />
    if (coursesIsError) return <ErrorAllert message={'Error! Something Went Wrong...!!!'} />



    return (
        <main className="p-2 lg:p-4">
            <CCard title={'My Courses'} secondary={<CButton onClick={() => setOpen(true)} variant={'contained'}>Add Course </CButton>}>
                {
                    coursesIsLoading && <Loading />
                }
                {
                    allCourses.length == 0
                    ?
                    <WarningAllert message={'No Course Data Found...!!!'} />
                    :
                    <CoursesTable data={allCourses || []} refetch={refetch} categorys={categorys || []} />
                }
            </CCard>

            <CModal
                open={open}
                onClose={() => setOpen(false)}
                title="Add Course"
                width={"w-full md:w-4/5 lg:w-1/2"}
            >
                <AddCourses setOpen={setOpen} refetch={refetch} categorys={categorys || []} role={role} />
            </CModal>
        </main>
    );
};

export default TeacherCourses;