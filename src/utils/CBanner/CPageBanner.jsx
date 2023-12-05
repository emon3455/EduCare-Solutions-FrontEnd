/* eslint-disable react/prop-types */
import { useState } from "react";
import { skills } from "../../constant/skills";
import CContainer from "../CContainer/CContainer";
import CSelect from "../CSelect/CSelect";

const CPageBanner = ({ title }) => {
    const [data, setData] = useState({
        skills: [skills[0]],
    })

    return (
        <header className="bg-primary text-white">
            <CContainer className="navbar flex-col gap-5 lg:flex-row justify-between py-20 px-8">
                <div className="text-3xl font-extrabold">
                    {title}
                </div>
                <div className="">
                    <CSelect label="Select a category"
                        name="skills"
                        options={skills?.map((subject) => ({
                            value: subject,
                            label: subject,
                        }))}
                        className="text-black w-[100%] md:w-[250px]"
                        classNamePrefix="select"
                        onChange={(selectedOptions) => {
                            setData({
                                ...data,
                                skills: selectedOptions.map((option) => option.value),
                            });
                        }} />
                </div>

            </CContainer>
        </header>

    );
};

export default CPageBanner;