/* eslint-disable no-unused-vars */
import CoursesTable from "../../../../components/admin/courses/CoursesTable";
import { useGetAllCourseQuery } from "../../../../redux/features/courses/courseSlice";
import ErrorAllert from "../../../../shared/ErrorAllert";
import WarningAllert from "../../../../shared/WarningAllert";
import CButton from "../../../../utils/CButton/CButton";
import CCard from "../../../../utils/CCard/CCard";
import Loading from "../../../../utils/CLoading/Loading";

const AdminCourse = () => {

    const { isLoading: coursesIsLoading, isError: coursesIsError, data: allCourses, refetch } = useGetAllCourseQuery();

    if(coursesIsError) return <ErrorAllert message={'Error! Something Went Wrong...!!!'} />
    return (
        <main className="p-2 lg:p-4">
            <CCard title={'Manage Courses'} secondary={<CButton variant={'contained'}>Add Course </CButton>}>
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
        </main>
    );
};

export default AdminCourse;