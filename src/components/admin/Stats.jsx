/* eslint-disable react/prop-types */
import { FaUser, FaUserTie, FaUserGraduate } from "react-icons/fa";
import { MdOutlineVideoLibrary, MdMenuBook } from "react-icons/md";
import { FaVideo } from "react-icons/fa6";

const Stats = ({ data }) => {
    return (
        <section className="mt-12 px-7">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-16">
                <div className=" bg-red-200 px-8 py-12 flex flex-col justify-center items-center rounded-xl">
                    <span className="text-3xl"><FaUser /></span>
                    <p className="text-2xl font-bold">User : {data.noOfUsers}</p>
                </div>
                <div className=" bg-zinc-300 px-8 py-12 flex flex-col justify-center items-center rounded-xl">
                    <span className="text-3xl"><FaUserTie /></span>
                    <p className="text-2xl font-bold">Teacher : {data.noOfTeacher}</p>
                </div>
                <div className=" bg-orange-200 px-8 py-12 flex flex-col justify-center items-center rounded-xl">
                    <span className="text-3xl"><FaUserGraduate /></span>
                    <p className="text-2xl font-bold">Students : {data.noOfStudent}</p>
                </div>
                <div className=" bg-amber-100 px-8 py-12 flex flex-col justify-center items-center rounded-xl">
                    <span className="text-3xl"><MdOutlineVideoLibrary /></span>
                    <p className="text-2xl font-bold">Courses : {data.noOfCourse}</p>
                </div>
                <div className=" bg-sky-200 px-8 py-12 flex flex-col justify-center items-center rounded-xl">
                    <span className="text-3xl"><MdMenuBook /></span>
                    <p className="text-2xl font-bold">Blogs : {data.noOfBlogs}</p>
                </div>
                <div className=" bg-green-200 px-8 py-12 flex flex-col justify-center items-center rounded-xl">
                    <span className="text-3xl"><FaVideo /></span>
                    <p className="text-2xl font-bold">Sessions : {data.noOfSessions}</p>
                </div>
            </div>
        </section >
    );
};

export default Stats;