import { SlLocationPin } from 'react-icons/Sl';
import { SlCallOut } from 'react-icons/Sl';
import CContainer from '../../utils/CContainer/CContainer';
import CButton from '../../utils/CButton/CButton';

const Contact = () => {
    return (
        <CContainer className="bg-primary text-white p-3 lg:p-16 flex flex-col lg:flex-row gap-5 mt-12 rounded-xl">
            <div className='w-full lg:w-[45%]'>
                <h2 className='text-3xl font-bold'>Contact With Us</h2>
                <p className='my-10'>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inve ntore veritatis et quasi.</p>
                <p className='flex gap-5 my-5'> <SlCallOut className='text-3xl' /><span>+88 01751589072</span></p>
                <p className='flex gap-5 my-5'> <SlLocationPin className='text-3xl' /><span>Dhaka, Bangladesh</span></p>
            </div>
            <div className='w-full lg:w-[55%]'>
                <form>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                        <input type='text' className='w-full h-full p-2 bg-[#FFFFFF0D] text-white rounded' placeholder='Name' />
                        <input type='email' className='w-full h-full p-2 bg-[#FFFFFF0D] text-white rounded' placeholder='Email' />
                        <input type='number' className='w-full h-full p-2 bg-[#FFFFFF0D] text-white rounded' placeholder='Mobile No' />
                        <input type='text' className='w-full h-full p-2 bg-[#FFFFFF0D] text-white rounded' placeholder='Institution Name' />
                    </div>

                    <textarea placeholder='Your message' className='w-full h-[150px] mt-4 p-4 bg-[#FFFFFF0D] text-white rounded mb-2' />
                    <CButton fullWidth={true} variant={"solid"}>Send</CButton>
                </form>
            </div>
        </CContainer>
    );
};

export default Contact;