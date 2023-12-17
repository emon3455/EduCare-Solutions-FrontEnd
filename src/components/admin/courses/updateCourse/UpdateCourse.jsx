/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useUpdateCourseMutation } from "../../../../redux/features/courses/courses-api-slice";
import CInput from "../../../../utils/CInput/CInput";
import CSelect from "../../../../utils/CSelect/CSelect";
import CFileInput from "../../../../utils/CFileInput/CFileInput";
import CTextArea from "../../../../utils/CTextArea/CTextArea";
import CButton from "../../../../utils/CButton/CButton";
import useCategory from "../../../../hooks/useCategory";
import Loading from "../../../../utils/CLoading/Loading";
import CCard from "../../../../utils/CCard/CCard";

const imageHostingToken = import.meta.env.VITE_IMAGE_UPLOAD_TOKEN;

const UpdateCourse = () => {

    const dataForUpdate = useLoaderData();
    const [categoryIsLoading, categorys] = useCategory();
    const [previewImage, setPreviewImage] = useState(dataForUpdate?.bannerURL);
    const [imageUploadLoading, setImageUploadLoading] = useState(false);
    const navigate = useNavigate(); 

    const [data, setData] = useState({
        id: dataForUpdate?._id,
        title: dataForUpdate?.title,
        teacherName: dataForUpdate?.teacherName,
        teacherEmail: dataForUpdate?.teacherEmail,
        image: null,
        bannerURL: dataForUpdate?.bannerURL,
        videoURL: dataForUpdate?.videoURL,
        categoryName: dataForUpdate?.categoryName,
        categoryId: dataForUpdate?.categoryId,
        price: dataForUpdate?.price ,
        description: dataForUpdate?.description
    })
    const [error, setError] = useState("")
    const imageHostingURL = `https://api.imgbb.com/1/upload?key=${imageHostingToken}`;

    const [
        updateCourse,
        { isLoading: updateCourseIsLoading, isSuccess: updateCourseIsSuccess, isError: updateCourseIsError, },
    ] = useUpdateCourseMutation();


    //showing success message
    useEffect(() => {
        if (updateCourseIsSuccess) {
            Swal.fire(
                'Course updated Successfully!',
                'Success!',
                'success'
            )
            navigate(-1);
        }
    }, [navigate, updateCourseIsSuccess]);

    //showing error message
    useEffect(() => {
        if (updateCourseIsError) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Course Not updated, Please try again...!',
            })
        }
    }, [updateCourseIsError]);

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
        if (!data.price) {
            setError("Price is required");
            return;
        }
        if (!data.videoURL) {
            setError("Video URL is required");
            return;
        }
        if (!data.description) {
            setError("Description is required");
            return;
        }

        if (
            data.title == dataForUpdate?.title && 
            data?.categoryName == dataForUpdate.categoryName && 
            data?.categoryId == dataForUpdate.categoryId && 
            data.videoURL == dataForUpdate.videoURL && 
            data.price == dataForUpdate.price && 
            data.image == null && 
            data.description == dataForUpdate.description
            ) {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Please Change atleast one attributes to update Course...!',
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

                        const updatedCourse = {
                            id: data.id,
                            title: data.title,
                            bannerURL: imgURL,
                            videoURL: data.videoURL,
                            categoryId: data.categoryId,
                            categoryName: data.categoryName,
                            price: parseFloat(data.price),
                            description: data.description,
                        }


                        try {
                            await updateCourse(updatedCourse)?.unwrap();

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
            const updatedCourse = {
                id: data.id,
                title: data.title,
                bannerURL: data.bannerURL,
                videoURL: data.videoURL,
                description: data.description,
                categoryId: data.categoryId,
                categoryName: data.categoryName,
                price: parseFloat(data.price),
            }

            try {
                await updateCourse(updatedCourse)?.unwrap();

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
                <CCard  title={'Update Courses'} secondary={<CButton onClick={()=>navigate(-1)} variant={'contained'}>Back</CButton>}>
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
                                        setData({
                                            ...data,
                                            image: "",
                                            bannerURL: "",
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
                                        categoryId: selectedOptions.value
                                    });
                                }}
                            />
                        </div>

                        <div className="">
                            <CInput
                                onChange={(e) => {
                                    if (e.target.value) {
                                        setError("")
                                    }
                                    setData({ ...data, price: e.target.value });
                                }}
                                id="price"
                                type="text"
                                label="price*"
                                placeholder="price"
                                defaultValue={data?.price || 0}
                            />
                        </div>

                        <div className="lg:col-span-2">
                            <CFileInput
                                label="Course Banner*"
                                onChange={handleImageChange}
                                accept="image/*"
                                files={data?.image || ""}
                            />
                        </div>

                        <div className="">
                            <CInput
                                onChange={(e) => {
                                    if (e.target.value) {
                                        setError("")
                                    }
                                    setData({ ...data, videoURL: e.target.value });
                                }}
                                id="video"
                                type="text"
                                label="Video URL*"
                                placeholder="Video URL"
                                defaultValue={data?.videoURL || ""}
                            />
                        </div>

                        <div className="mt-2">
                            <CTextArea
                                onChange={(e) => {
                                    setData({ ...data, description: e.target.value });
                                }}
                                id="descreption"
                                placeholder="Descreption"
                                defaultValue={data?.description || ""}
                            />
                        </div>

                        <div className="">
                            <CButton
                                variant={"solid"}
                                type={"submit"}
                                isLoading={(imageUploadLoading || updateCourseIsLoading) ? true : false}
                            >
                                Update Course
                            </CButton>
                        </div>

                    </form>
                </CCard>
            </div>
        </main>
    );
};

export default UpdateCourse;