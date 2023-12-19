/* eslint-disable react/prop-types */
import { useLocation, useNavigate } from "react-router-dom";
import CContainer from "../utils/CContainer/CContainer";
import CButton from "../utils/CButton/CButton";
import { BsArrowLeft } from "react-icons/Bs";
import { useMemo } from "react";

const UserDetails = ({ user }) => {

    const customStyle = "rounded border-2 border-dashed border-gray-200 dark:border-gray-600 p-1";

    const location = useLocation();
    const navigator = useNavigate();

    const handleBack = () => {
        navigator(-1);
    }

    const calculateAge = useMemo(() => {
        const birthdateString = user?.dateOfBirth || "";
        if (!birthdateString) {
            return "N/A"; // or any default value you prefer
        }

        const birthdate = new Date(birthdateString);
        const currentDate = new Date();
        const age = currentDate.getFullYear() - birthdate.getFullYear();

        // Adjust age if birthday hasn't occurred yet this year
        if (
            currentDate.getMonth() < birthdate.getMonth() ||
            (currentDate.getMonth() === birthdate.getMonth() &&
                currentDate.getDate() < birthdate.getDate())
        ) {
            return age - 1;
        }

        return age;
    }, [user?.dateOfBirth]);

    return (
        <div>
            <CContainer className={"mt-5"}>
                <div className="p-2 border border-[#E6E6E6] rounded-lg shadow-lg">

                    {
                        !(location.pathname === "/dashboard/profile")
                        &&
                        <div className="flex justify-end mb-2">
                            <CButton
                                variant={"solid"}
                                onClick={handleBack}
                            >
                                <BsArrowLeft className="font-extrabold" />
                            </CButton>
                        </div>
                    }



                    <section className="p-4 flex flex-col md:flex-row justify-center items-center gap-5">

                        <div className="w-full md:w-1/4 rounded">
                            <div className="">
                                <img
                                    src={
                                        user?.image
                                            ? user?.image
                                            : "https://i.ibb.co/5nPD3Qg/user.jpg"
                                    }
                                    alt="teacher image"
                                    className="w-40 h-40 mx-auto rounded border-2 border-gray-200 object-cover"
                                />
                            </div>

                        </div>

                        <div className="w-full md:w-3/4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-auto mb-5">

                                <SingleInfo data={`${user?.name}`} title={"NAME"} />

                                <SingleInfo data={`${user?.gender}`} title={"GENDER"} />

                                <SingleInfo data={`${calculateAge}`} title={"AGE"} />

                                <SingleInfo data={`${user?.nid}`} title={"NID NUMBER"} />

                                <SingleInfo data={`${user?.email}`} title={"EMAIL"} />

                            </div>
                        </div>
                    </section>

                    <section className="my-2 space-y-2">

                        <div className={`${customStyle}`}>
                            <p className="text-base font-medium">
                                {user?.skills ? user?.skills?.map((skill, indx) => (
                                    <span key={indx}> {skill}, </span>
                                ))
                                    :
                                    "N/A"
                                }
                            </p>
                            <h2 className="text-gray-500 text-xs">SKILLS: </h2>
                        </div>

                        <div className={`${customStyle}`}>
                            <span className="text-base font-medium">
                                {user?.address ? user?.address : "N/A"}
                            </span>{" "}
                            <br />
                            <span className="text-gray-500 text-xs">ADDRESS:</span>
                        </div>

                        <div className={`${customStyle}`}>
                            {
                                user?.educationalQualifications
                                    ?
                                    <>
                                        <span className="text-base font-medium">
                                            {user?.educationalQualifications && user?.educationalQualifications}
                                        </span>
                                        <br />
                                    </>
                                    :
                                    "N/A"
                            }
                            <span className="text-gray-500 text-xs">EDUCATIONAL QUALIFICATIONS:</span>
                        </div>

                    </section>
                </div>
            </CContainer>
        </div>
    );
};

export default UserDetails;

const SingleInfo = ({ data, title }) => {
    return (
        <>
            <div
                className={`rounded border-2 border-dashed border-gray-200 dark:border-gray-600 p-1 text-center`}
            >
                <p className="text-base font-medium">
                    {data ? data === 'undefined' ? "N/A" : data : "N/A"}
                </p>
                <h2 className="text-gray-500 text-xs">{title}</h2>
            </div>
        </>
    );
};