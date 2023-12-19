/* eslint-disable no-unused-vars */
import { useLoaderData, useNavigate } from "react-router-dom";
import useCategory from "../../../../hooks/useCategory";
import { useEffect, useState } from "react";
import { useUpdateSessionMutation } from "../../../../redux/features/sessions/session-api-slice";
import Loading from "../../../../utils/CLoading/Loading";
import Swal from "sweetalert2";
import CButton from "../../../../utils/CButton/CButton";
import CFileInput from "../../../../utils/CFileInput/CFileInput";
import CSelect from "../../../../utils/CSelect/CSelect";
import CInput from "../../../../utils/CInput/CInput";
import CCard from "../../../../utils/CCard/CCard";
import { FaTimes } from "react-icons/fa";

const imageHostingToken = import.meta.env.VITE_IMAGE_UPLOAD_TOKEN;

const UpdateSession = () => {

    const dataForUpdate = useLoaderData();
    const [categoryIsLoading, categorys] = useCategory();
    const [previewImage, setPreviewImage] = useState(dataForUpdate?.sessionBanner);
    const [imageUploadLoading, setImageUploadLoading] = useState(false);
    const navigate = useNavigate();

    const [data, setData] = useState({
        id: dataForUpdate?._id,
        title: dataForUpdate?.title,
        teacherName: dataForUpdate?.teacherName,
        teacherEmail: dataForUpdate?.teacherEmail,
        image: null,
        sessionBanner: dataForUpdate?.sessionBanner,
        categoryName: dataForUpdate?.categoryName,
        categoryId: dataForUpdate?.categoryId,
        sessionDate: dataForUpdate?.sessionDate,
        sessionPlatform: dataForUpdate?.sessionPlatform,
        sessionLink: dataForUpdate?.sessionLink,
        sessionTime: dataForUpdate?.sessionTime
    })
    const [error, setError] = useState("");
    const imageHostingURL = `https://api.imgbb.com/1/upload?key=${imageHostingToken}`;

    const [
        updateSession,
        { isLoading: updateSessionIsLoading, isSuccess: updateSessionIsSuccess, isError: updateSessionIsError, },
    ] = useUpdateSessionMutation();

    //showing success message
    useEffect(() => {
        if (updateSessionIsSuccess) {
            Swal.fire(
                'Session updated Successfully!',
                'Success!',
                'success'
            )
            navigate(-1);
        }
    }, [navigate, updateSessionIsSuccess]);

    //showing error message
    useEffect(() => {
        if (updateSessionIsError) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Session Not updated, Please try again...!',
            })
        }
    }, [updateSessionIsError]);

    if (categoryIsLoading) return <Loading />

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!data.title) {
            setError("Title is required");
            return;
        }
        if (!data.teacherName) {
            setError("Teacher Name is required");
            return;
        }
        if (!data.teacherEmail) {
            setError("Teacher Email is required");
            return;
        }
        if (!data.categoryId) {
            setError("Category Id is required");
            return;
        }
        if (!data.categoryName) {
            setError("Category Name is required");
            return;
        }
        if (!data.sessionDate) {
            setError("Session Date is required");
            return;
        }
        if (!data.sessionPlatform) {
            setError("Session Platform is required");
            return;
        }
        if (!data.sessionLink) {
            setError("Session Link is required");
            return;
        }
        if (!data.sessionTime) {
            setError("Session Time is required");
            return;
        }

        if (
            data.title == dataForUpdate?.title &&
            data?.categoryName == dataForUpdate.categoryName &&
            data?.categoryId == dataForUpdate.categoryId &&
            data.image == null &&
            data.sessionDate == dataForUpdate.sessionDate &&
            data.sessionPlatform == dataForUpdate.sessionPlatform &&
            data.sessionLink == dataForUpdate.sessionLink &&
            data.sessionTime == dataForUpdate.sessionTime
        ) {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Please Change at least one attributes to update Session...!',
            })
            return;
        }

        if (data.image) {

            const formData = new FormData();
            formData.append('image', data.image);

            setImageUploadLoading(true);
            fetch(imageHostingURL, {
                method: "POST",
                body: formData
            })
                .then(res => res.json())
                .then(async (imgResponse) => {
                    if (imgResponse.success) {

                        const imgURL = imgResponse.data.display_url;
                        setImageUploadLoading(false);

                        const updatedSession = {
                            id: data.id,
                            title: data.title,
                            sessionBanner: imgURL,
                            categoryId: data.categoryId,
                            categoryName: data.categoryName,
                            teacherName: data.teacherName,
                            teacherEmail: data.teacherEmail,
                            sessionDate: data.sessionDate,
                            sessionPlatform: data.sessionPlatform,
                            sessionLink: data.sessionLink,
                            sessionTime: data.sessionTime,
                        }
                        console.log(updatedSession);

                        try {
                            await updateSession(updatedSession)?.unwrap();

                        } catch (err) {
                            console.log(err);
                        }
                    }
                    else {
                        setImageUploadLoading(false);
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Image Not Uploaded...!',
                        })
                        return;
                    }
                })
                .catch(er => { console.log(er.message) })
        }
        else {
            const updatedSession = {
                id: data.id,
                title: data.title,
                sessionBanner: data.sessionBanner,
                categoryId: data.categoryId,
                categoryName: data.categoryName,
                teacherName: data.teacherName,
                teacherEmail: data.teacherEmail,
                sessionDate: data.sessionDate,
                sessionPlatform: data.sessionPlatform,
                sessionLink: data.sessionLink,
                sessionTime: data.sessionTime,
            }
            console.log(updatedSession);

            try {
                await updateSession(updatedSession)?.unwrap();

            } catch (err) {
                console.log(err);
            }

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
        e.target.value = null;
    };



    return (
        <main>
        <div className="w-full lg:max-w-2xl mx-auto">
            <CCard title={'Update Session'} secondary={<CButton onClick={() => navigate(-1)} variant={'contained'}>Back</CButton>}>
                {previewImage && (
                    <div className="relative z-40">
                        <div className="">
                            <img
                                src={previewImage}
                                alt="Session image"
                                className="w-16 h-16 rounded-full mx-auto object-cover border-2 border-cyan-950 shadow-lg"
                            />
                        </div>
                        <div className="text-center -mt-3">
                            <button
                                onClick={() => {
                                    setPreviewImage(null);
                                    setData({
                                        ...data,
                                        image: "",
                                        blogBanner: "",
                                    });
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

                <form onSubmit={handleSubmit}>

                    <div className="">
                        <CInput
                            onChange={(e) => {
                                if (e.target.value) {
                                    setError("")
                                }
                                setData({ ...data, title: e.target.value });
                            }}
                            id="title"
                            type="text"
                            label="Title*"
                            placeholder="Title"
                            defaultValue={data?.title || ""}
                        />
                    </div>

                    <div className="">
                        <CInput
                            onChange={(e) => {
                                if (e.target.value) {
                                    setError("")
                                }
                                setData({ ...data, teacherName: e.target.value });
                            }}
                            id="name"
                            type="name"
                            label="Teacher Name*"
                            placeholder="Teacher Name"
                            defaultValue={data?.teacherName || ""}
                            disabled={true}
                            read
                        />
                    </div>

                    <div className="">
                        <CInput 
                            onChange={(e) => {
                                if (e.target.value) {
                                    setError("")
                                }
                                setData({ ...data, teacherEmail: e.target.value });
                            }}
                            id="email"
                            type="email"
                            label="Teacher Email*"
                            placeholder="Title"
                            defaultValue={data?.teacherEmail || ""}
                            disabled={true}
                        />
                    </div>

                    <div className="mt-2">
                        <CSelect
                            defaultValue={{ value: data?.categoryId || "", label: data?.categoryName || "" }}
                            options={categorys?.map((subject) => ({
                                value: subject._id,
                                label: subject.categoryName,
                            }))}
                            title={"Category"}
                            className="basic-single"
                            classNamePrefix="select"
                            onChange={(selectedOptions) => {
                                setData({
                                    ...data,
                                    categoryName: selectedOptions.label,
                                    categoryId: selectedOptions.value,
                                });
                            }}
                        />
                        {error && !data.categoryId && (
                            <p className="text-xs text-red-600">Category is required</p>
                        )}
                    </div>

                    <div className="">
                    <CInput
                        onChange={(e) => {
                            if (e.target.value) {
                                setError("")
                            }
                            setData({ ...data, sessionDate: e.target.value });
                        }}
                        id="sessionDate"
                        type="date"
                        label="sessionDate*"
                        defaultValue={data?.sessionDate || ""}
                        placeholder="sessionDate"
                    />
                </div>

                <div className="">
                    <CInput
                        onChange={(e) => {
                            if (e.target.value) {
                                setError("")
                            }
                            setData({ ...data, sessionPlatform: e.target.value });
                        }}
                        id="sessionPlatform"
                        type="text"
                        label="sessionPlatform*"
                        defaultValue={data?.sessionPlatform || ""}
                        placeholder="sessionPlatform"
                    />
                </div>

                <div className="">
                    <CInput
                        onChange={(e) => {
                            if (e.target.value) {
                                setError("")
                            }
                            setData({ ...data, sessionLink: e.target.value });
                        }}
                        id="sessionLink"
                        type="text"
                        label="sessionLink*"
                        defaultValue={data?.sessionLink || ""}
                        placeholder="sessionLink"
                    />
                </div>

                <div className="">
                    <CInput
                        onChange={(e) => {
                            if (e.target.value) {
                                setError("")
                            }
                            setData({ ...data, sessionTime: e.target.value });
                        }}
                        id="sessionTime"
                        type="time"
                        label="sessionTime*"
                        defaultValue={data?.sessionTime || ""}
                        placeholder="sessionTime"
                    />
                </div>

                    <div className="lg:col-span-2">
                        <CFileInput
                            label="Blog Banner*"
                            onChange={handleImageChange}
                            accept="image/*"
                            files={data?.image || ""}
                        />
                    </div>

                    <div className="mt-2">
                        <CButton
                            variant={"solid"}
                            type={"submit"}
                            loading={(imageUploadLoading || updateSessionIsLoading) ? true : false}
                        >
                            Update Session
                        </CButton>
                    </div>

                </form>
            </CCard>
        </div>
    </main>
    );
};

export default UpdateSession;