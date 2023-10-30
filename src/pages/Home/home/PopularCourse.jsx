import CContainer from "../../../components/customComponent/CContainer";
import ComponentTitle from "../../../shared/ComponentTitle";

const PopularCourse = () => {
    return (
        <CContainer>
            <ComponentTitle title={`Popular Courses`} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-7">
                <div className="border border-[#E6E6E6] rounded-xl hover:shadow-2xl">
                    <img className="w-full md:h-52" src="https://i.ibb.co/KxDxppB/Rectangle-15-1.png" alt="" />
                    <div className="p-5">
                        <h3 className="mt-3 font-bold text-xl">Web Development</h3>
                        <p className="text-[#6C6B6B]">Instructor: Jhankar Mahbub</p>
                        <img className="mt-2" src="https://i.ibb.co/NYdVqZt/Group-24.png" alt="" />
                        <button className="bg-transparent hover:bg-secondary text-secondary hover:text-white border border-orange-300 hover:border-transparent py-3 px-6 rounded-md mt-4 w-full  transition duration-300 ease-in-out font-bold">View Details</button>
                    </div>
                </div>
                <div className="border border-[#E6E6E6] rounded-xl hover:shadow-2xl">
                    <img className="w-full md:h-52" src="https://i.ibb.co/7QYST1W/Rectangle-15-2.png" alt="" />
                    <div className="p-5">
                        <h3 className="mt-3 font-bold text-xl">Web Development</h3>
                        <p className="text-[#6C6B6B]">Instructor: Jhankar Mahbub</p>
                        <img className="mt-2" src="https://i.ibb.co/NYdVqZt/Group-24.png" alt="" />
                        <button className="bg-transparent hover:bg-secondary text-secondary hover:text-white border border-orange-300 hover:border-transparent py-3 px-6 rounded-md mt-4 w-full  transition duration-300 ease-in-out font-bold">View Details</button>
                    </div>
                </div>
                <div className="border border-[#E6E6E6] rounded-xl hover:shadow-2xl">
                    <img className="w-full md:h-52" src="https://i.ibb.co/QNQKdZh/Rectangle-15-3.png" alt="" />
                    <div className="p-5">
                        <h3 className="mt-3 font-bold text-xl">Web Development</h3>
                        <p className="text-[#6C6B6B]">Instructor: Jhankar Mahbub</p>
                        <img className="mt-2" src="https://i.ibb.co/NYdVqZt/Group-24.png" alt="" />
                        <button className="bg-transparent hover:bg-secondary text-secondary hover:text-white border border-orange-300 hover:border-transparent py-3 px-6 rounded-md mt-4 w-full  transition duration-300 ease-in-out font-bold">View Details</button>
                    </div>
                </div>
            </div>
        </CContainer>
    );
};

export default PopularCourse;