import { useLoaderData, useNavigate } from "react-router-dom";
import { useUpdateUserInfoMutation } from "../../../../redux/features/user/user-api-slice";
import Loading from "../../../../utils/CLoading/Loading";
import { useContext, useEffect, useState } from "react";
import CButton from "../../../../utils/CButton/CButton";
import CTextArea from "../../../../utils/CTextArea/CTextArea";
import CFileInput from "../../../../utils/CFileInput/CFileInput";
import CSelect from "../../../../utils/CSelect/CSelect";
import { FaTimes } from "react-icons/fa";
import CInput from "../../../../utils/CInput/CInput";
import { genders } from "../../../../constant/genders";
import useCategory from "../../../../hooks/useCategory";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../providers/AuthProvider";
const imageHostingToken = import.meta.env.VITE_IMAGE_UPLOAD_TOKEN;

const UpdateUsers = () => {

    const { updateAuthUser } = useContext(AuthContext)
    const [CategoryisLoading, categoryData] = useCategory()
    const userInfo = useLoaderData();

    const [data, setData] = useState({
        id: userInfo?._id || "",
        name: userInfo?.name || "",
        email: userInfo?.email || "",
        number: userInfo?.number || "",
        gender: userInfo?.gender || "",
        image: "",
        userImage: userInfo?.image || "",
        interst: userInfo?.interst || [],
        skills: userInfo?.skills || [],
        educationalQualifications: userInfo?.educationalQualifications || "",
        address: userInfo?.address || "",
        dateOfBirth: userInfo?.dateOfBirth || "",
        nid: userInfo?.nid || ""
    })

    const [error, setError] = useState("")
    const navigate = useNavigate();

    const [previewImage, setPreviewImage] = useState(userInfo?.image);
    const imageHostingURL = `https://api.imgbb.com/1/upload?key=${imageHostingToken}`;

    const [
        updateUserInfo,
        { isLoading: updateUserIsLoading, isSuccess: updateUserIsSuccess, isError: updateUserIsError, },
    ] = useUpdateUserInfoMutation();


    useEffect(() => {
        setData({
            id: userInfo?._id,
            name: userInfo?.name,
            email: userInfo?.email,
            number: userInfo?.number,
            gender: userInfo?.gender,
            image: "",
            userImage: userInfo?.image,
            interst: userInfo?.interst,
            skills: userInfo?.skills,
            educationalQualifications: userInfo?.educationalQualifications,
            address: userInfo?.address,
            dateOfBirth: userInfo?.dateOfBirth,
            nid: userInfo?.nid
        })
        setPreviewImage(userInfo?.image);
    }, [userInfo])
    console.log("data", data);
    console.log("data1", userInfo);

    //showing success message
    useEffect(() => {
        if (updateUserIsSuccess) {
            Swal.fire(
                'User updated Successfully!',
                'Success!',
                'success'
            )
            navigate(-1);
        }
    }, [navigate, updateUserIsSuccess]);

    //showing error message
    useEffect(() => {
        if (updateUserIsError) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'User Not updated, Please try again...!',
            })
        }
    }, [updateUserIsError]);


    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (!data.name) {
            setError("Name is required");
            return;
        }

        if (!data.email) {
            setError("Email Is Required");
            return;
        }
        if (data.email) {
            const regXEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regXEmail.test(data.email)) {
                setError("Please Enter Valid Email")
                return;
            }
        }

        if (!data.number) {
            setError("Number Is Required")
            return;
        }

        if (data.image) {

            const formData = new FormData();
            formData.append('image', data.image);

            fetch(imageHostingURL, {
                method: "POST",
                body: formData
            })
                .then(res => res.json())
                .then((imgResponse) => {
                    if (imgResponse.success) {

                        const imgURL = imgResponse.data.display_url;

                        const updatedCourse = {
                            id: data.id,
                            name: data.name,
                            email: data.email,
                            number: data.number,
                            image: imgURL,
                            gender: data.gender,
                            dateOfBirth: data.dateOfBirth,
                            nid: data.nid,
                            interest: data.interst,
                            skills: data.skills,
                            educationalQualifications: data.educationalQualifications,
                            address: data.address,
                        }

                        updateAuthUser(data?.email, imgURL)
                            .then(async () => {
                                try {
                                    await updateUserInfo(updatedCourse)?.unwrap();
                                } catch (err) {
                                    console.log(err);
                                }
                            }).catch((error) => {
                                console.log(error);
                            });

                    }
                    else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Image Not Updated...!',
                        })
                        return;
                    }
                })
                .catch(er => { console.log(er.message) })
        }
        else {
            const updatedCourse = {
                id: data.id,
                name: data.name,
                email: data.email,
                number: data.number,
                image: data.userImage,
                gender: data.gender,
                dateOfBirth: data.dateOfBirth,
                nid: data.nid,
                interest: data.interst,
                skills: data.skills,
                educationalQualifications: data.educationalQualifications,
                address: data.address,
            }

            updateAuthUser(data.email, data.userImage)
                .then(async () => {
                    try {
                        await updateUserInfo(updatedCourse)?.unwrap();
                    } catch (err) {
                        console.log(err);
                    }
                }).catch((error) => {
                    console.log(error);
                });
        }

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

    if (CategoryisLoading) return <Loading />
    if (updateUserIsLoading) return <Loading />

    return (
        <div>
            {
                data?.name && <div className="bg-white min-h-screen w-full lg:w-3/4 mx-auto grid grid-cols-1 items-center p-2">
                    <div className="border rounded">
                        <form onSubmit={handleSubmit} className="card-body">
                            <h2 className="text-xl lg:text-xl font-bold text-center">Update Your Information</h2>

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
                                        defaultValue={data?.name}
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
                                        defaultValue={data?.email}
                                        disabled={true}
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
                                        defaultValue={data?.number}
                                    />
                                </div>

                                <div className="">
                                    <CInput
                                        onChange={(e) => {
                                            if (e.target.value) {
                                                setError("")
                                            }
                                            setData({ ...data, nid: e.target.value });
                                        }}
                                        id="nid"
                                        type="number"
                                        label="NID*"
                                        placeholder="NID"
                                        defaultValue={data?.nid}
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
                                    <CSelect
                                        defaultValue={{ value: data.gender, label: data.gender }}
                                        options={genders.map((gender) => ({
                                            value: gender,
                                            label: gender,
                                        }))}
                                        title={"Gender"}
                                        className="basic-single"
                                        classNamePrefix="select"
                                        label="Gender*"
                                        placeholder="Gender"
                                        onChange={(selectedOptions) => {
                                            setData({ ...data, gender: selectedOptions.value });
                                        }}
                                    />
                                </div>

                                <div className="">
                                    <CInput
                                        onChange={(e) => {
                                            if (e.target.value) {
                                                setError("")
                                            }
                                            setData({ ...data, dateOfBirth: e.target.value });
                                        }}
                                        id="dateOfBirth"
                                        type="date"
                                        label="Date Of Birth"
                                        placeholder="Date Of Birth"
                                        defaultValue={data?.dateOfBirth}
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
                                        options={categoryData?.map((subject) => ({
                                            value: subject.categoryName,
                                            label: subject.categoryName,
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
                                        options={categoryData?.map((subject) => ({
                                            value: subject.categoryName,
                                            label: subject.categoryName,
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

                                <div className="">
                                    <CTextArea
                                        onChange={(e) => {
                                            setData({ ...data, educationalQualifications: e.target.value });
                                        }}
                                        id="Educational_qualifications"
                                        placeholder="Educational Qualifications"
                                        defaultValue={data.educationalQualifications}
                                    />
                                </div>

                                <div className="">
                                    <CTextArea
                                        onChange={(e) => {
                                            setData({ ...data, address: e.target.value });
                                        }}
                                        id="address"
                                        placeholder="Address"
                                        defaultValue={data.address}
                                    />
                                </div>

                            </section>

                            <div className="">
                                <CButton
                                    variant={"solid"}
                                    type={"submit"}
                                // loading={isLoading}
                                >
                                    Update Info
                                </CButton>
                            </div>

                        </form>
                    </div>
                </div>
            }
        </div>
    );
};

export default UpdateUsers;