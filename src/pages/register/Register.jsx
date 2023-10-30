import { useState } from "react";
import registers from "../../../public/register.jpg"
import { useForm } from "react-hook-form";
import { FaEyeSlash, FaHome, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { genders } from "../../constant/genders";
import CSelect from "../../components/customComponent/CSelect";
import { roles } from "../../constant/role";
import CFileInput from "../../components/customComponent/CFileInput";
import { skills } from "../../constant/skills";
import CTextArea from "../../components/customComponent/CTextArea";

const Register = () => {

    const [data, setData] = useState({
        gender: genders[0],
        role: roles[0],
        profileImage: "",
        interst: [skills[1]],
        skills: [skills[0]],
        educationalQualifications: "",
        address: "",
        designation: ""

    })
    const [previewImage, setPreviewImage] = useState(null);
    const [hide, setHide] = useState(true);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(data);
    };

    const handleImageChange = (e) => {
        const selectedImageFile = e.target.files[0];
        if (selectedImageFile) {
            const maxSize = 2 * 1024 * 1024; // 2MB in bytes
            if (selectedImageFile.size > maxSize) {

                alert("Image size should be less than 2MB")
                setPreviewImage(null);
                setData({ ...data, profileImage: "" });
            } else {
                const selectedImage = URL.createObjectURL(selectedImageFile);
                setPreviewImage(selectedImage);
                setData({ ...data, profileImage: e.target.files[0] });
            }
        }
    };

    return (
        <main className="relative">
            <div className="absolute top-5 left-5 text-white z-20">
                <Link to="/" className="text-secondary text-2xl"><FaHome /></Link>
            </div>
            <section className="flex flex-col lg:flex-row min-h-screen">

                <div className="hidden lg:flex bg-primary min-h-screen w-full lg:w-1/3  justify-center items-center relative">
                    <div className="w-full lg:w-3/5">
                        <img src={registers} alt="login image" className="w-full rounded" />
                    </div>
                </div>

                <div className="bg-white min-h-screen w-full lg:w-3/5 mx-auto grid grid-cols-1 items-center p-2">
                    <div className="border rounded">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body ">
                            <h2 className="text-xl lg:text-xl font-bold text-center">Join With <span className="text-secondary">Edu-Care</span> Solution</h2>

                            {previewImage && (
                                <div className="relative z-40">
                                    <div className="">
                                        <img
                                            src={previewImage}
                                            alt="user image"
                                            className="w-16 h-16 rounded-full mx-auto object-cover border-2 border-cyan-950 shadow-lg"
                                        />
                                    </div>
                                    <div className="text-center -mt-2">
                                        <button
                                            onClick={() => {
                                                setPreviewImage(null);
                                                setData({ ...data, profileImage: "" });
                                            }}
                                            className="btn btn-circle btn-xs bg-red-500 text-white hover:text-black"
                                        >
                                            <FaTimes />
                                        </button>
                                    </div>
                                </div>
                            )}

                            <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-2">

                                <div className="form-control ">
                                    <input type="text" placeholder="Name*" name="name" {...register("name", { required: true })} className="input input-bordered rounded" />
                                    {errors.name && <span className="text-red-600 text-xs">Name is required</span>}
                                </div>

                                <div className="form-control">
                                    <input
                                        type="email"
                                        placeholder="Email*"
                                        {...register('email', { required: true })}
                                        className="input input-bordered rounded w-full"
                                    />
                                    {errors.email && <span className="text-red-600 text-xs">Email is required</span>}
                                </div>

                                <div className="form-control">
                                    <input
                                        type="number"
                                        placeholder="Number*"
                                        {...register('number', { required: true })}
                                        className="input input-bordered rounded w-full"
                                    />
                                    {errors.number && <span className="text-red-600 text-xs">Number is required</span>}
                                </div>

                                <div className="form-control">

                                    <div className="relative">
                                        <input
                                            type={`${hide ? 'password' : 'text'}`}
                                            {...register('password', {
                                                required: true,
                                                minLength: 6,
                                                maxLength: 20,
                                                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                                            })}
                                            placeholder="Password*"
                                            className="input input-bordered rounded w-full"
                                        />
                                        <span
                                            onClick={() => setHide(!hide)}
                                            className="btn btn-ghost border border-l-0 border-collapse absolute right-0"
                                        >
                                            <FaEyeSlash />
                                        </span>
                                    </div>
                                    {errors.password?.type === 'required' && <p className="text-red-600 text-xs">Password is required</p>}
                                    {errors.password?.type === 'minLength' && <p className="text-red-600 text-xs">Password must be 6 characters</p>}
                                    {errors.password?.type === 'maxLength' && <p className="text-red-600 text-xs">Password must be less than 20 characters</p>}
                                    {errors.password?.type === 'pattern' && (
                                        <span className="text-red-600 text-xs">Password must contain Uppercase, lowercase, number and special character.</span>
                                    )}
                                </div>

                                <div className="">
                                    <CSelect
                                        defaultValue={{ value: data.gender, label: data.gender }}
                                        options={genders.map((gender) => ({
                                            value: gender,
                                            label: gender,
                                        }))}
                                        title={"Gender"}
                                        className="basic-single"
                                        classNamePrefix="select"
                                        onChange={(selectedOptions) => {
                                            setData({ ...data, gender: selectedOptions.value });
                                        }}
                                    />
                                </div>

                                <div className="">
                                    <CSelect
                                        defaultValue={{ value: data.role, label: data.role }}
                                        options={roles.map((role) => ({
                                            value: role,
                                            label: role,
                                        }))}
                                        title={"Role"}
                                        className="basic-single"
                                        classNamePrefix="select"
                                        onChange={(selectedOptions) => {
                                            setData({ ...data, gender: selectedOptions.value });
                                        }}
                                    />
                                </div>

                                <div className="">
                                    <CSelect
                                        label="Area Of Interest"
                                        defaultValue={data?.interst?.map((subject) => ({
                                            value: subject,
                                            label: subject,
                                        }))}
                                        isMulti
                                        name="Interests"
                                        options={skills?.map((subject) => ({
                                            value: subject,
                                            label: subject,
                                        }))}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        onChange={(selectedOptions) => {
                                            setData({
                                                ...data,
                                                interst: selectedOptions.map((option) => option.value),
                                            });
                                        }}
                                    />
                                </div>

                                <div className="">
                                    <CSelect
                                        label="Skills"
                                        defaultValue={data?.skills?.map((subject) => ({
                                            value: subject,
                                            label: subject,
                                        }))}
                                        isMulti
                                        name="Skills"
                                        options={skills?.map((subject) => ({
                                            value: subject,
                                            label: subject,
                                        }))}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        onChange={(selectedOptions) => {
                                            setData({
                                                ...data,
                                                skills: selectedOptions.map((option) => option.value),
                                            });
                                        }}
                                    />
                                </div>

                                <div className="lg:col-span-2">
                                    <CFileInput
                                        label="Profile Photo"
                                        onChange={handleImageChange}
                                        accept="image/*"
                                        files={data?.profileImage}
                                    />
                                </div>

                                <div className="">
                                    <CTextArea
                                        onChange={(e) => {
                                            setData({ ...data, educationalQualifications: e.target.value });
                                        }}
                                        id="Educational_qualifications"
                                        placeholder="Educational Qualifications"
                                    />
                                </div>

                                <div className="">
                                    <CTextArea
                                        onChange={(e) => {
                                            setData({ ...data, address: e.target.value });
                                        }}
                                        id="address"
                                        placeholder="Address"
                                    />
                                </div>

                            </section>

                            {/* <div className="">
                                <CInput
                                    onChange={(e) => {
                                        setData({ ...data, designation: e.target.value });
                                    }}
                                    id="designation"
                                    type="text"
                                    label="Designation*"
                                    placeholder="Designation*"
                                    className="normal-input"
                                />
                            </div> */}

                            <div className="">
                                <input type="submit" value="Register" className="btn-primary" />
                            </div>

                        </form>
                        <p className="text-center my-2 text-sm">
                            Already Have an Account ? <Link to="/login" className="text-secondary">Login</Link>
                        </p>
                    </div>
                </div>

            </section>
        </main>
    );
};

export default Register;