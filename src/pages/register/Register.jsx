/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash, FaHome, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { genders } from "../../constant/genders";
import { roles } from "../../constant/role";
import { skills } from "../../constant/skills";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";
import CSelect from "../../utils/CSelect/CSelect";
import CInput from "../../utils/CInput/CInput";
import CFileInput from "../../utils/CFileInput/CFileInput";
import CTextArea from "../../utils/CTextArea/CTextArea";
import CButton from "../../utils/CButton/CButton";
import { useAddUserMutation } from "../../redux/features/user/user-api-slice";
const imageHostingToken = import.meta.env.VITE_IMAGE_UPLOAD_TOKEN;

const Register = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState({
        name: "",
        email: "",
        number: "",
        password: "",
        gender: genders[0],
        role: roles[0],
        image: "",
        interst: [skills[1]],
        skills: [skills[0]],
        educationalQualifications: "",
        address: "",
    })

    const [error, setError] = useState("")

    const { createUser, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const [previewImage, setPreviewImage] = useState(null);
    const [hide, setHide] = useState(true);
    const imageHostingURL = `https://api.imgbb.com/1/upload?key=${imageHostingToken}`;

    //register mutation
    const [
        addUser,
        { isLoading: registerIsLoading, isSuccess: registerIsSuccess, data: RegisterData, isError: registerIsError, error: registerError },
    ] = useAddUserMutation();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        setIsLoading(true);
        if (!data.name) {
            setError("Name is required");
            setIsLoading(false);
            return;
        }

        if (!data.email) {
            setError("Email Is Required")
            setIsLoading(false);
            return;
        }
        if (data.email) {
            const regXEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regXEmail.test(data.email)) {
                setError("Please Enter Valid Email")
                setIsLoading(false);
                return;
            }
        }

        if (!data.number) {
            setError("Number Is Required")
            setIsLoading(false);
            return;
        }

        if (!data.password) {
            setError("Password Is Required")
            setIsLoading(false);
            return;
        }
        if (data.password) {
            if (data.password.length < 6) {
                setError("Password must contain at least 6 characters");
                setIsLoading(false);
                return
            }
            const regXPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{6,}$/;
            if (!regXPass.test(data.password)) {
                setError("Password Must Contain: Capital Latter, Small Latter, Number and Special Character");
                setIsLoading(false);
                return;
            }
        }

        if (!data.image) {
            setError("Profile Image Is Required")
            setIsLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('image', data.image);

        fetch(imageHostingURL, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imgResponse => {
                if (imgResponse.success) {

                    const imgURL = imgResponse.data.display_url;

                    createUser(data.email, data.password)
                        .then(res => {
                            const createdUser = res.user;
                            if (createdUser) {

                                updateProfile(createdUser, {
                                    displayName: data.name, photoURL: imgURL
                                }).then(async() => {

                                    // we have to store this user information into DB
                                    const savedUser = {
                                        name: data.name,
                                        email: data.email,
                                        image: imgURL,
                                        number: data.number,
                                        password: data.password,
                                        gender: data.gender,
                                        roles: data.role,
                                        interest: data.interst,
                                        skills: data.skills,
                                        educationalQualifications: data.educationalQualifications,
                                        address: data.address,
                                    }
                                    console.log(savedUser);

                                    const res = await addUser(savedUser)?.unwrap();
                                    if (res.insertedId) {
                                        Swal.fire(
                                            'User created Successfully!',
                                            'Success!',
                                            'success'
                                        )
                                        logOut()
                                            .then(() => {
                                                navigate("/login", { replace: true });
                                            })
                                            .catch(er => console.log(er))
                                        e.target.reset();
                                        setIsLoading(false);
                                    }
                                    else {
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Oops...',
                                            text: 'Something went wrong!',
                                        })
                                        setIsLoading(false);
                                        return;
                                    }


                                }).catch((error) => {
                                    console.log(error.message);
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        text: 'Something went wrong!',
                                    })
                                    setIsLoading(false);
                                    return;
                                });

                            }
                            else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Something went wrong!',
                                })
                                setIsLoading(false);
                                return;
                            }
                        })
                        .catch(er => {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Something went wrong!',
                            })
                            setIsLoading(false);
                            return;
                        })

                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Image Not Uploaded...!',
                    })
                    setIsLoading(false);
                    return;
                }
            })
            .catch(er => { console.log(er.message); setIsLoading(false); })
    }

    const handleImageChange = (e) => {
        const selectedImageFile = e.target.files[0];
        if (selectedImageFile) {
            const maxSize = 2 * 1024 * 1024; // 2MB in bytes
            if (selectedImageFile.size > maxSize) {
                alert("Image size should be less than 2MB")
                setPreviewImage(null);
                setData({ ...data, image: "" });
            } else {
                setError("");
                const selectedImage = URL.createObjectURL(selectedImageFile);
                setPreviewImage(selectedImage);
                setData({ ...data, image: e.target.files[0] });
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
                        <img src="https://i.ibb.co/wRrNZSw/register.jpg" alt="login image" className="w-full rounded" />
                    </div>
                </div>

                <div className="bg-white min-h-screen w-full lg:w-3/5 mx-auto grid grid-cols-1 items-center p-2">
                    <div className="border rounded">
                        <form onSubmit={handleSubmit} className="card-body">
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
                                    <div className="text-center -mt-3">
                                        <button
                                            onClick={() => {
                                                setPreviewImage(null);
                                                setData({ ...data, image: "" });
                                            }}
                                            className="btn btn-circle btn-xs bg-red-500 text-white hover:text-black"

                                        >
                                            <FaTimes />
                                        </button>
                                    </div>
                                </div>
                            )}

                            <p className="text-xs text-red-600 text-center">
                                {error}
                            </p>

                            <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-2">

                                <div className="">
                                    <CInput
                                        onChange={(e) => {
                                            if (e.target.value) {
                                                setError("")
                                            }
                                            setData({ ...data, name: e.target.value });
                                        }}
                                        id="name"
                                        type="text"
                                        label="Name*"
                                        placeholder="Name"
                                    />
                                </div>

                                <div className="">
                                    <CInput
                                        onChange={(e) => {
                                            if (e.target.value) {
                                                setError("")
                                            }
                                            setData({ ...data, email: e.target.value });
                                        }}
                                        id="email"
                                        type="email"
                                        label="Email*"
                                        placeholder="Email"
                                    />
                                </div>

                                <div className="">
                                    <CInput
                                        onChange={(e) => {
                                            if (e.target.value) {
                                                setError("")
                                            }
                                            setData({ ...data, number: e.target.value });
                                        }}
                                        id="number"
                                        type="number"
                                        label="Number*"
                                        placeholder="Number"
                                    />
                                </div>


                                <div className="">
                                    <CInput
                                        onChange={(e) => {
                                            if (e.target.value) {
                                                setError("")
                                            }
                                            setData({
                                                ...data,
                                                password: e.target.value,
                                            });

                                        }}

                                        id="password"
                                        type={`${hide ? "password" : "text"}`}
                                        label="Password*"
                                        placeholder="Password*"
                                        className={`${error.password ? "error-input" : "normal-input"}`}
                                        endIcon={
                                            <span onClick={() => setHide(!hide)}>
                                                {" "}
                                                {hide ? <FaEye /> : <FaEyeSlash />}{" "}
                                            </span>
                                        }
                                    />

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
                                            setData({ ...data, role: selectedOptions.value });
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
                                                interest: selectedOptions.map((option) => option.value),
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
                                        label="Profile Photo*"
                                        onChange={handleImageChange}
                                        accept="image/*"
                                        files={data?.image}
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


                            <div className="">
                                <CButton variant={"solid"} type={"submit"} loading={isLoading}>Register</CButton>
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