/* eslint-disable react/prop-types */
import ComponentTitle from "../../shared/ComponentTitle";
import { SlLocationPin } from 'react-icons/Sl';
import { BsCalendar4 } from 'react-icons/Bs';
import CContainer from "../../utils/CContainer/CContainer";
import { Link } from "react-router-dom";
import CButton from "../../utils/CButton/CButton";

const ExpertTeacher = ({popularTeacher}) => {
    return (
        <CContainer className="mt-12">
            <ComponentTitle title={`Our Expert Teachers`} />
            <p className="my-3 lg:my-5 px-3 lg:px-24 text-center">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inve ntore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-7 p-2">
                {
                    popularTeacher.map(teacher => <div
                        key={teacher?._id}
                        className="border border-[#E6E6E6] rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500"
                    >
                        <img className="mx-auto h-40 object-contain p-2" src={teacher?.image} alt="" />
                        <div className="p-4">
                            <h3 className="mt-3 font-bold text-xl">{teacher?.name}</h3>
                            <img className="mt-2" src="https://i.ibb.co/NYdVqZt/Group-24.png" alt="" />
                        </div>
                        <div className="p-4">
                            <div className="text-[#6C6B6B]  pb-4 flex gap-3">
                                <SlLocationPin className='mt-1 text-xl' />
                                <p>From: {teacher?.address}</p>
                            </div>
                            <div className="text-[#6C6B6B]  pb-4 flex gap-3">
                                <BsCalendar4 className='mt-1 text-xl' />
                                <p>Available On Mon-Saturday</p>
                            </div>
                            <Link to={`teacher/${teacher?._id}`}>
                                <CButton variant={"outline"} fullWidth={true}>View Profile</CButton>
                            </Link>
                        </div>
                    </div>)
                }
            </div>

        </CContainer>
    );
};

export default ExpertTeacher;