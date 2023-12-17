/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import CInput from "../../../../utils/CInput/CInput";
import { AuthContext } from "../../../../providers/AuthProvider";
import Swal from "sweetalert2";
import { FaTimes } from "react-icons/fa";
import CFileInput from "../../../../utils/CFileInput/CFileInput";
import CSelect from "../../../../utils/CSelect/CSelect";
import CTextArea from "../../../../utils/CTextArea/CTextArea";
import CButton from "../../../../utils/CButton/CButton";
import { useAddCourseMutation } from "../../../../redux/features/courses/courses-api-slice";
const imageHostingToken = import.meta.env.VITE_IMAGE_UPLOAD_TOKEN;

const AddCourses = ({ setOpen, refetch, categorys, role }) => {


    const { user } = useContext(AuthContext);
    const [previewImage, setPreviewImage] = useState(null);
    const [imageUploadLoading, setImageUploadLoading] = useState(false);
    const [data, setData] = useState({
        title: "",
        teacherName: user?.displayName || "",
        teacherEmail: user?.email || "",
        image: "",
        videoURL: "",
        categoryName: categorys[0].categoryName,
        categoryId: categorys[0].categoryId,
        price: 0,
        descreption: ""
    })
    const [error, setError] = useState("")
    const imageHostingURL = `https://api.imgbb.com/1/upload?key=${imageHostingToken}`;

    const [
        addCourse,
        { isLoading: addCourseIsLoading, isSuccess: addCourseIsSuccess, isError: addCourseIsError, },
    ] = useAddCourseMutation();

    //showing success message
    useEffect(() => {
        if (addCourseIsSuccess) {
            Swal.fire(
                'Course Added Successfully!',
                'Success!',
                'success'
            )
            refetch();
            setOpen(false);
        }
    }, [addCourseIsSuccess, refetch, setOpen]);

    //showing error message
    useEffect(() => {
        if (addCourseIsError) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Course Not Added, Please try again...!',
            })
        }
    }, [addCourseIsError]);


    const handleSubmit = (e) => {
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
        if (!data.image) {
            setError("Course Image is required");
            return;
        }
        if (!data.videoURL) {
            setError("Video URL is required");
            return;
        }
        if (!data.descreption) {
            setError("Descreption is required");
            return;
        }

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

                    const savedCourse = {
                        title: data.title,
                        bannerURL: imgURL,
                        videoURL: data.videoURL,
                        description: data.descreption,
                        categoryId: data.categoryId,
                        categoryName: data.categoryName,
                        teacherName: data.teacherName,
                        teacherEmail: data.teacherEmail,
                        price: parseFloat(data.price),
                        rating: 0.0,
                        totalstu: 0,
                        completedstu: 0
                    }

                    try {
                        await addCourse(savedCourse)?.unwrap();
                        setData({
                            ...data,
                            title: "",
                            teacherName: user?.displayName || "",
                            teacherEmail: user?.email || "",
                            image: "",
                            videoURL: "",
                            categoryName: categorys[0],
                            categoryId: "",
                            price: null,
                            descreption: ""
                        });
                        e.target.reset();
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

        setPreviewImage(null);
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
                        defaultValue={data?.teacherName}
                        disabled={role === 'Teacher' ? true : false}
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
                        defaultValue={data?.teacherEmail}
                        disabled={role === 'Teacher' ? true : false}
                    />
                </div>

                <div className="mt-2">
                    <CSelect
                        defaultValue={{ value: data.categoryId, label: data.categoryName }}
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
                        type="number"
                        label="price*"
                        placeholder="price"
                    />
                </div>

                <div className="lg:col-span-2">
                    <CFileInput
                        label="Course Banner*"
                        onChange={handleImageChange}
                        accept="image/*"
                        files={data?.image}
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
                    />
                </div>

                <div className="mt-2">
                    <CTextArea
                        onChange={(e) => {
                            setData({ ...data, descreption: e.target.value });
                        }}
                        id="descreption"
                        placeholder="Descreption"
                    />
                </div>

                <div className="">
                    <CButton variant={"solid"} type={"submit"} isLoading={imageUploadLoading || addCourseIsLoading}>
                        Add Course
                    </CButton>
                </div>

            </form>
        </main>
    );
};

export default AddCourses;