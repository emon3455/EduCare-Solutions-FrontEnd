import { Link } from "react-router-dom";
import { sessionsData } from "../../content/data";
import CPageBanner from "../../utils/CBanner/CPageBanner";

const Sessions = () => {
    return (
        <div>
            <CPageBanner title={`Sessions`}/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-7 p-2 mx-5 h-auto rounded">
                {
                    sessionsData.map(session => <div
                        key={session._id}
                        className="border border-[#E6E6E6] rounded-lg hover:shadow-xl transition-all duration-500">
                        <img className="w-full md:h-52 overflow-hidden" src={session.sessionBanner} alt="" />
                        <div className="p-5">
                            <h3 className="mt-3 font-bold text-xl">{session.title}</h3>
                            {/* <p className="text-[#6C6B6B]">Writer: {session.TName}</p> */}
                            <div className="flex items-center justify-between  mb-4 text-[#6C6B6B]">
                                <p className="mt-2">Date : {session.sessionDate}</p>
                                <p className="mt-2">Time : {session.sessionTime}</p>
                            </div>
                            <div className="flex items-center justify-between  mb-4 text-[#6C6B6B]">
                                <p className="mt-2">Platform : {session.sessionPlatform}</p>
                                <Link className="mt-2 text-right">Joining link : <br/> <span className="text-blue-600 underline">{session.sessionLink}</span> </Link>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Sessions;