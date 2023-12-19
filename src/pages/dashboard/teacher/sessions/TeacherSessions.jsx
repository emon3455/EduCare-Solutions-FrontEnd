import { useContext, useEffect, useState } from "react";
import useCategory from "../../../../hooks/useCategory";
import useRole from "../../../../hooks/useRole";
import { useGetAllMySessionQuery } from "../../../../redux/features/sessions/session-api-slice";
import Loading from "../../../../utils/CLoading/Loading";
import ErrorAllert from "../../../../shared/ErrorAllert";
import CButton from "../../../../utils/CButton/CButton";
import CCard from "../../../../utils/CCard/CCard";
import { AuthContext } from "../../../../providers/AuthProvider";
import WarningAllert from "../../../../shared/WarningAllert";
import SessionsTable from "../../../../components/admin/sessions/SessionsTable";
import CModal from "../../../../utils/CModal/CModal";
import AddSession from "../../../../components/admin/sessions/addSession/AddSession";


const TeacherSessions = () => {
    const { user } = useContext(AuthContext);
    const [categoryIsLoading, categorys] = useCategory();
    const [roleIsLoading, role] = useRole();
    const [open, setOpen] = useState(false);

    const { isLoading: sessionsIsLoading, isError: sessionsIsError, data: allSessions, refetch } = useGetAllMySessionQuery({
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
    if (sessionsIsError) return <ErrorAllert message={'Error! Something Went Wrong...!!!'} />

    return (
        <main className="p-2 lg:p-4">
            <CCard title={'Manage Sessions'} secondary={<CButton onClick={() => setOpen(true)} variant={'contained'}>Add Session</CButton>}>
                {
                    sessionsIsLoading && <Loading />
                }
                {
                    allSessions?.length == 0
                        ?
                        <WarningAllert message={'No Session Data Found...!!!'} />
                        :
                        <SessionsTable data={allSessions || []} refetch={refetch} categorys={categorys || []} />
                }
            </CCard>

            <CModal
                open={open}
                onClose={() => setOpen(false)}
                title="Add Session"
                width={"w-full md:w-4/5 lg:w-1/2"}
            >
                <AddSession setOpen={setOpen} refetch={refetch} categorys={categorys || []} role={role} />
            </CModal>
        </main>
    );
};

export default TeacherSessions;