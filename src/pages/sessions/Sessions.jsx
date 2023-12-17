import { Link } from "react-router-dom";
import { sessionsData } from "../../content/data";
import CSkeleton from "../../utils/CSkeleton/CSkeleton";
import { useGetAllSessionQuery } from "../../redux/features/sessions/session-api-slice";

const Sessions = () => {

    const { isLoading, isError, data, refetch } = useGetAllSessionQuery();
    console.log(isLoading);
    console.log(data);
    console.log(refetch);
    console.log(isError);

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-7 p-2 mx-5 h-auto rounded">
                {
                    isLoading
                        ?
                        <>
                            <CSkeleton />
                            <CSkeleton />
                            <CSkeleton />
                        </>
                        :
                        sessionsData.map(session => <div
                            key={session._id}
                            className="border border-[#E6E6E6] rounded-lg hover:shadow-xl transition-all duration-500">
                            <img className="w-full md:w-4/5 mx-auto md:h-56 p-4" src={session?.sessionBanner} alt="" />
                            <div className="p-5">
                                <h3 className="font-bold text-lg h-20">{session?.title}</h3>
                                <div className="flex items-center justify-between  mb-4 text-[#6C6B6B]">
                                    <p className="mt-2">Date : {session?.sessionDate}</p>
                                    <p className="mt-2">Time : {session?.sessionTime}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-4 text-[#6C6B6B]">
                                    <p className="mt-2">Platform : {session?.sessionPlatform}</p>
                                    <p>Joining Link: <Link to={session?.sessionLink} target="_blank" className="text-blue-600 font-semibold">Link</Link></p>
                                </div>
                            </div>
                        </div>)
                }
            </div>
        </div>
    );
};

export default Sessions;