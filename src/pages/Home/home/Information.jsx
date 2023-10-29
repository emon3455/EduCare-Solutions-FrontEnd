import { FaRegClock } from 'react-icons/fa';
import { SlLocationPin } from 'react-icons/Sl';
import { SlCallOut } from 'react-icons/Sl';

const Information = () => {
    return (
        <div className="container mx-auto flex flex-col lg:flex-row lg:justify-between gap-8 text-white my-10">
            <div className='bg-[#811A64] flex gap-5 w-[364px] h-[202px] p-12 rounded-xl'>
                <FaRegClock className='text-5xl' />
                <div>
                    <h3 className='text-2xl font-bold'>Opening Hours</h3>
                    <p className='text-md mt-4'>24/7 Active Instructors for 100+ Courses</p>
                </div>
            </div>
            <div className='bg-[#F1946D] flex gap-5 w-[364px] h-[202px] p-12 rounded-xl'>
                <SlLocationPin className='text-5xl' />
                <div>
                    <h3 className='text-2xl font-bold'>Our Locations</h3>
                    <p className='text-md mt-4'>24/7 We Can Provide service To All Over The World</p>
                </div>
            </div>
            <div className='bg-[#0E6159] flex gap-5 w-[364px] h-[202px] p-12 rounded-xl'>
                <SlCallOut className='text-5xl' />
                <div>
                    <h3 className='text-2xl font-bold'>Contact Us</h3>
                    <p className='text-md mt-4'>+88 01750 00 00 00
                        edu@gmail.com</p>
                </div>
            </div>
        </div>
    );
};

export default Information;