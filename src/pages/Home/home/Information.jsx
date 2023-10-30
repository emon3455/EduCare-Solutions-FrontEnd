import { FaRegClock } from 'react-icons/fa';
import { SlLocationPin } from 'react-icons/Sl';
import { SlCallOut } from 'react-icons/Sl';
import CContainer from '../../../components/customComponent/CContainer';

const Information = () => {
    return (
        <CContainer className="flex flex-col lg:flex-row lg:justify-between gap-4 lg:gap-8 text-white my-10 p-2">
            <div className='bg-[#811A64] flex gap-5 p-12 rounded-xl w-full lg:w-1/3'>
                <FaRegClock className='text-5xl' />
                <div>
                    <h3 className='text-2xl font-bold'>Opening Hours</h3>
                    <p className='text-md mt-4'>24/7 Active Instructors for 100+ Courses</p>
                </div>
            </div>
            <div className='bg-[#F1946D] flex gap-5  p-12 rounded-xl w-full lg:w-1/3'>
                <SlLocationPin className='text-5xl' />
                <div>
                    <h3 className='text-2xl font-bold'>Our Locations </h3>
                    <p className='text-md mt-4'>24/7 We Can Provide service To All Over The World</p>
                </div>
            </div>
            <div className='bg-[#0E6159] flex gap-5 p-12 rounded-xl w-full lg:w-1/3'>
                <SlCallOut className='text-5xl' />
                <div>
                    <h3 className='text-2xl font-bold'>Contact Us</h3>
                    <p className='text-md mt-4'>+88 01750 00 00 00
                        edu@gmail.com</p>
                </div>
            </div>
        </CContainer>
    );
};

export default Information;