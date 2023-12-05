/* eslint-disable react/prop-types */
import { useState } from "react";
import { skills } from "../../constant/skills";
import CContainer from "../CContainer/CContainer";
import CSelect from "../CSelect/CSelect";

const CPageBanner = ({ title, date }) => {
    const [skill, setSkill] = useState(skills[0])

    return (
        <header className="bg-primary text-white">
            <CContainer className="navbar flex-col gap-5 lg:flex-row justify-between py-20 px-8">
                <div className="text-3xl font-extrabold">
                    {title}
                </div>

                {
                    date
                        ?
                        <div className="text-gray-600">
                            <input type="date" className="rounded p-2"></input>
                        </div>

                        :
                        <div className="">
                            <CSelect label="Select a category"
                                defaultValue={skill}
                                options={skills?.map((skill) => ({
                                    value: skill,
                                    label: skill,
                                }))}
                                className="text-black w-[100%] md:w-[250px]"
                                classNamePrefix="select"
                                onChange={(selectedOptions) => {
                                    setSkill(selectedOptions.value);
                                }} />
                        </div>
                }

            </CContainer>
        </header>

    );
};

export default CPageBanner;