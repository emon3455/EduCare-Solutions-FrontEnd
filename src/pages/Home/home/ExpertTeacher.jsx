import CContainer from "../../../components/CContainer";
import ComponentTitle from "../../../shared/ComponentTitle";
import { SlLocationPin } from 'react-icons/Sl';
import { BsCalendar4 } from 'react-icons/Bs';

const ExpertTeacher = () => {
    return (
        <CContainer className="mt-12">
            <ComponentTitle title={`Our Expert Teachers`} />
            <p className="my-3 lg:my-5 px-3 lg:px-24 text-center">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inve ntore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-7">
                <div className="border border-[#E6E6E6] rounded-xl hover:shadow-2xl">
                    <img className="w-full md:h-52 px-10 pt-10" src="https://i.ibb.co/r6hXNyG/Rectangle15.png" alt="" />
                    <div className="p-5">
                        <h3 className="mt-3 font-bold text-xl">Karyen Anderson</h3>
                        <p className="text-[#6C6B6B]">BTP -  Senior Physiotherapist</p>
                        <img className="mt-2" src="https://i.ibb.co/NYdVqZt/Group-24.png" alt="" />
                    </div>
                    <div className="p-5 mt-2">
                        <div className="text-[#6C6B6B]  pb-4 flex gap-3">
                            <SlLocationPin className='mt-1 text-xl' />
                            <p>From Sydney, Australia</p>
                        </div>
                        <div className="text-[#6C6B6B]  pb-4 flex gap-3">
                            <BsCalendar4 className='mt-1 text-xl' />
                            <p>Available On Mon-Saturday</p>
                        </div>
                        <div className="text-[#6C6B6B]  pb-4 flex gap-3">
                            <SlLocationPin className='mt-1 text-xl' />
                            <p>$20</p>
                        </div>
                        <button className="bg-transparent hover:bg-secondary text-secondary hover:text-white border border-orange-300 hover:border-transparent py-3 px-6 rounded-md mt-4 w-full  transition duration-300 ease-in-out font-bold">View Profile</button>
                    </div>
                </div>
                <div className="border border-[#E6E6E6] rounded-xl hover:shadow-2xl">
                    <img className="w-full md:h-52 px-10 pt-10" src="https://i.ibb.co/r6hXNyG/Rectangle15.png" alt="" />
                    <div className="p-5">
                        <h3 className="mt-3 font-bold text-xl">Karyen Anderson</h3>
                        <p className="text-[#6C6B6B]">BTP -  Senior Physiotherapist</p>
                        <img className="mt-2" src="https://i.ibb.co/NYdVqZt/Group-24.png" alt="" />
                    </div>
                    <div className="p-5 mt-2">
                        <div className="text-[#6C6B6B]  pb-4 flex gap-3">
                            <SlLocationPin className='mt-1 text-xl' />
                            <p>From Sydney, Australia</p>
                        </div>
                        <div className="text-[#6C6B6B]  pb-4 flex gap-3">
                            <BsCalendar4 className='mt-1 text-xl' />
                            <p>Available On Mon-Saturday</p>
                        </div>
                        <div className="text-[#6C6B6B]  pb-4 flex gap-3">
                            <SlLocationPin className='mt-1 text-xl' />
                            <p>$20</p>
                        </div>
                        <button className="bg-transparent hover:bg-secondary text-secondary hover:text-white border border-orange-300 hover:border-transparent py-3 px-6 rounded-md mt-4 w-full  transition duration-300 ease-in-out font-bold">View Profile</button>
                    </div>
                </div>
                <div className="border border-[#E6E6E6] rounded-xl hover:shadow-2xl">
                    <img className="w-full md:h-52 px-10 pt-10" src="https://i.ibb.co/r6hXNyG/Rectangle15.png" alt="" />
                    <div className="p-5">
                        <h3 className="mt-3 font-bold text-xl">Karyen Anderson</h3>
                        <p className="text-[#6C6B6B]">BTP -  Senior Physiotherapist</p>
                        <img className="mt-2" src="https://i.ibb.co/NYdVqZt/Group-24.png" alt="" />
                    </div>
                    <div className="p-5 mt-2">
                        <div className="text-[#6C6B6B]  pb-4 flex gap-3">
                            <SlLocationPin className='mt-1 text-xl' />
                            <p>From Sydney, Australia</p>
                        </div>
                        <div className="text-[#6C6B6B]  pb-4 flex gap-3">
                            <BsCalendar4 className='mt-1 text-xl' />
                            <p>Available On Mon-Saturday</p>
                        </div>
                        <div className="text-[#6C6B6B]  pb-4 flex gap-3">
                            <SlLocationPin className='mt-1 text-xl' />
                            <p>$20</p>
                        </div>
                        <button className="bg-transparent hover:bg-secondary text-secondary hover:text-white border border-orange-300 hover:border-transparent py-3 px-6 rounded-md mt-4 w-full  transition duration-300 ease-in-out font-bold">View Profile</button>
                    </div>
                </div>
            </div>

        </CContainer>
    );
};

export default ExpertTeacher;