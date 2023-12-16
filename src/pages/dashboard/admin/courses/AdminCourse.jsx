/* eslint-disable no-unused-vars */
import { useState } from "react";
import CoursesTable from "../../../../components/admin/courses/CoursesTable";
import { useGetAllCourseQuery } from "../../../../redux/features/courses/courseSlice";
import ErrorAllert from "../../../../shared/ErrorAllert";
import WarningAllert from "../../../../shared/WarningAllert";
import CButton from "../../../../utils/CButton/CButton";
import CCard from "../../../../utils/CCard/CCard";
import Loading from "../../../../utils/CLoading/Loading";
import CModal from "../../../../utils/CModal/CModal";
import AddCourses from "../../../../components/admin/courses/addCourse/AddCourses";

const AdminCourse = () => {

    const [open, setOpen] = useState(false);

    const { isLoading: coursesIsLoading, isError: coursesIsError, data: allCourses, refetch } = useGetAllCourseQuery();

    if (coursesIsError) return <ErrorAllert message={'Error! Something Went Wrong...!!!'} />
    return (
        <main className="p-2 lg:p-4">
            <CCard title={'Manage Courses'} secondary={<CButton onClick={()=> setOpen(true)} variant={'contained'}>Add Course </CButton>}>
                {
                    coursesIsLoading && <Loading />
                }
                {
                    allCourses
                        ?
                        <CoursesTable data={allCourses || []} />
                        :
                        <WarningAllert message={'No Course Data Found...!!!'} />
                }
            </CCard>

            {
                <CModal
                    open={open}
                    onClose={() => setOpen(false)}
                    title="Add Course"
                    width={"w-full md:w-4/5 lg:w-1/2"}
                >
                    <AddCourses setOpen={setOpen} refetch={refetch} />
                </CModal>
            }
        </main>
    );
};

export default AdminCourse;