import { SlLocationPin } from 'react-icons/Sl';
import { SlCallOut } from 'react-icons/Sl';

const Contact = () => {
    return (
        <div className="bg-[#07332F] text-white p-20 flex">
            <div>
                <h2 className='text-3xl font-bold'>Contact With Us</h2>
                <p className='mt-3'>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inve ntore veritatis et quasi.</p>
                <p className='flex gap-5 my-3'> <SlCallOut className='text-3xl' /><span>+88 01750 14 14 14</span></p>
                <p className='flex gap-5 my-3'> <SlLocationPin className='text-3xl' /><span>Dhaka, Bangladesh</span></p>
            </div>
            <div>
                
            </div>
        </div>
    );
};

export default Contact;