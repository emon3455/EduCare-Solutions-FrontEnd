import { Link } from "react-router-dom";
import CContainer from "../components/customComponent/CContainer";

const Footer = () => {
    return (
        <footer className=" bg-[#F3F3F3] mt-12 lg:mt-24">
            <CContainer className="text-black-300 py-5 lg:py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    <div className="w-full md:w-[100%] px-4 ">
                        <h3 className="text-2xl font-bold"><span className="text-[#F7A582]">Edu-Care</span> Solutions</h3>
                        <p className='text-sm mt-2 text-[#6C6B6B]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. has been since the printer took.</p>
                        <button className="bg-transparent hover:bg-[#F7A582] text-[#F7A582] hover:text-white border border-orange-300 hover:border-transparent py-3 px-6 rounded-md mt-4 transition duration-300 ease-in-out font-bold">Message</button>
                    </div>
                    <div className="w-full md:w-1/2 px-4">
                        <h3 className="text-xl font-bold mb-2">Quick Links</h3>
                        <div className="text-[#6C6B6B] font-semibold">
                        <ul className=" pt-2 pb-2 text-sm">
                            <li className="py-2"><Link to="#">About Us</Link></li>
                            <li className="py-2"><Link to="#">Sevice</Link></li>
                            <li className="py-2"><Link to="#">Professors</Link></li>
                            <li className="py-2"><Link to="#">Departments</Link></li>
                            <li className="py-2"><Link to="#">Online Payment</Link></li>
                            <li className="py-2"><Link to="#">Contact Us</Link></li>
                            <li className="py-2"><Link to="#">My Account</Link></li>
                        </ul>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 px-4">
                        <h3 className="text-xl font-bold mb-2">Services</h3>
                        <div className="text-[#6C6B6B] font-semibold">
                        <ul className="  pt-2 pb-2 text-sm">
                            <li className="py-2"><a href="#">Online Class</a></li>
                            <li className="py-2"><a href="#">Lecture Class</a></li>
                            <li className="py-2"><a href="#">Test Preperation</a></li>
                            <li className="py-2"><a href="#">Service 4</a></li>
                        </ul>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 px-4 pt-2 pb-2 text-sm ">
                        <h3 className="text-xl font-bold mb-2">Service Hours</h3>
                        <div className="text-[#6C6B6B] font-semibold">
                            <p className="py-2">Monday 10AM to 7PM</p>
                            <p className="py-2">Monday 10AM to 7PM</p>
                            <p className="py-2">Monday 10AM to 7PM</p>
                        </div>
                    </div>
                </div>
                <div className="w-full px-4 mt-6">
                    <hr className="border-t-2 border-gray-300" />
                </div>
                <div className="w-full px-4 text-center mt-6 text-sm text-[#6C6B6B]">
                    <p>Copyright &copy; 2023 - All rights reserved by EduCare Solution Ltd.</p>
                </div>
            </CContainer>

        </footer>
    );
};

export default Footer;