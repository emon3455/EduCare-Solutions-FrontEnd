
import Lottie from "lottie-react";
import errors from "../../src/assets/error.json"
import { Link } from 'react-router-dom'
import CButton from "../utils/CButton/CButton";

        
const Error = () => {
    return (
        <div className="h-screen flex flex-col gap-0 justify-center items-center ">
            <div className='h-2/3'>
                <Lottie className='w-full h-full' animationData={errors} loop={true}></Lottie>
            </div>
            <h2 className="text-xl text-center font-semibold text-red-500 my-4">Something Went Wrong..!!!</h2>
            <Link to='/'>
                <CButton variant={'contained'}>Go Back To Homepage</CButton>
            </Link>
        </div>
    );
    
};

export default Error;