/* eslint-disable react/prop-types */

import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaPenToSquare } from "react-icons/fa6";

const CoursesTable = ({ data }) => {
    return (
        <section className="mx-auto">

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Banner</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Rating</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((course, index) => <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="avatar">
                                        <div className="w-12 h-10 rounded">
                                            <img src={course.bannerURL} alt="course Banner" />
                                        </div>
                                    </div>
                                </td>
                                <td>{course?.title}</td>
                                <td>{course?.categoryName}</td>
                                <td>{course?.price} BDT</td>
                                <td>{course?.rating}</td>
                                <td className="space-x-2">
                                    <button className={'bg-orange-400 text-white rounded-full p-2'} >
                                        <FaPenToSquare className="text-lg p-0"/>
                                    </button>
                                    <button className={'bg-red-500 text-white rounded-full p-2'} >
                                        <RiDeleteBin2Fill className="text-lg p-0"/>
                                    </button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>

        </section>
    );
};

export default CoursesTable;