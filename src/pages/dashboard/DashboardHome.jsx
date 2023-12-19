import Stats from "../../components/admin/Stats";
import { useGetStatsQuery } from "../../redux/features/stats/stats-api-slice";
import ErrorAllert from "../../shared/ErrorAllert";
import WarningAllert from "../../shared/WarningAllert";
import CCard from "../../utils/CCard/CCard";
import Loading from "../../utils/CLoading/Loading";

const DashboardHome = () => {

    const { isLoading: statsIsLoading, isError: statsIsError, data: stats } = useGetStatsQuery();
    if (statsIsError) return <ErrorAllert message={'Error! Something Went Wrong...!!!'} />

    return (
        <main className="p-2 lg:p-4">
            <CCard>
                {
                    statsIsLoading && <Loading />
                }
                {
                    stats?.length == 0
                        ?
                        <WarningAllert message={'No stats Data Found...!!!'} />
                        :
                        <Stats data={stats || []} />
                }
            </CCard>
        </main>
    );
};

export default DashboardHome;