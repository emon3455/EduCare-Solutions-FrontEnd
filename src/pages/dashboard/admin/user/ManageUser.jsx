import { useEffect } from "react";
import Loading from "../../../../utils/CLoading/Loading";
import ErrorAllert from "../../../../shared/ErrorAllert";
import { useGetAllUserQuery } from "../../../../redux/features/user/user-api-slice";
import CCard from "../../../../utils/CCard/CCard";
import WarningAllert from "../../../../shared/WarningAllert";
import UsersTable from "../../../../components/admin/users/UsersTable";


const ManageUser = () => {


    const { isLoading: usersIsLoading, isError: usersIsError, data: allusers, refetch } = useGetAllUserQuery();

    useEffect(() => {
        refetch()
    }, [refetch]);

    if (usersIsLoading) return <Loading />
    if (usersIsError) return <ErrorAllert message={'Error! Something Went Wrong...!!!'} />

    return (
        <main className="p-2 lg:p-4">
            <CCard title={'Manage Users'}>
                {
                    usersIsLoading && <Loading />
                }
                {
                    allusers.length == 0
                        ?
                        <WarningAllert message={'No Course Data Found...!!!'} />
                        :
                        <UsersTable
                            data={allusers || []}
                            refetch={refetch}
                        />
                }
            </CCard>
        </main>
    );
};

export default ManageUser;