import { SlLocationPin } from 'react-icons/Sl';
import { SlCallOut } from 'react-icons/Sl';
import CContainer from '../../../components/CContainer';

const Contact = () => {
    return (
        <CContainer className="bg-primary text-white p-3 lg:p-48 flex flex-col lg:flex-row gap-5 mt-12 rounded-xl">
            <div className='w-full lg:w-[45%]'>
                <h2 className='text-5xl font-bold'>Contact With Us</h2>
                <p className='my-10'>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inve ntore veritatis et quasi.</p>
                <p className='flex gap-5 my-5'> <SlCallOut className='text-3xl' /><span>+88 01750 14 14 14</span></p>
                <p className='flex gap-5 my-5'> <SlLocationPin className='text-3xl' /><span>Dhaka, Bangladesh</span></p>
            </div>
            <div className='w-full lg:w-[55%]'>
                <form>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                        <input type='text' className='w-full h-full p-5 bg-[#FFFFFF0D] text-white rounded-xl' placeholder='Name' />
                        <input type='email' className='w-full h-full p-5 bg-[#FFFFFF0D] text-white rounded-xl' placeholder='Email' />
                        <input type='number' className='w-full h-full p-5 bg-[#FFFFFF0D] text-white rounded-xl' placeholder='Mobile No' />
                        <input type='text' className='w-full h-full p-5 bg-[#FFFFFF0D] text-white rounded-xl' placeholder='Institution Name' />
                    </div>

                    <textarea placeholder='Your message' className='w-full h-[150px] mt-6 p-5 bg-[#FFFFFF0D] text-white rounded-xl' />
                    <button type='submit' className='w-full h-full mt-6 p-5 bg-[#F7A582] text-white rounded-xl font-bold'>Send</button>
                </form>
            </div>
        </CContainer>
    );
};

export default Contact;