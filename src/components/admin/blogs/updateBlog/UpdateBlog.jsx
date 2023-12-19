import { useLoaderData, useNavigate } from "react-router-dom";
import useCategory from "../../../../hooks/useCategory";
import { useEffect, useState } from "react";
import { useUpdateBlogMutation } from "../../../../redux/features/blogs/blog-api-slice";
import Swal from "sweetalert2";
import { FaTimes } from "react-icons/fa";
import Loading from "../../../../utils/CLoading/Loading";
import CCard from "../../../../utils/CCard/CCard";
import CButton from "../../../../utils/CButton/CButton";
import CInput from "../../../../utils/CInput/CInput";
import CSelect from "../../../../utils/CSelect/CSelect";
import CFileInput from "../../../../utils/CFileInput/CFileInput";
import CTextArea from "../../../../utils/CTextArea/CTextArea";

const imageHostingToken = import.meta.env.VITE_IMAGE_UPLOAD_TOKEN;

const UpdateBlog = () => {

    const dataForUpdate = useLoaderData();
    const [categoryIsLoading, categorys] = useCategory();
    const [previewImage, setPreviewImage] = useState(dataForUpdate?.blogBanner);
    const [imageUploadLoading, setImageUploadLoading] = useState(false);
    const navigate = useNavigate();

    const [data, setData] = useState({
        id: dataForUpdate?._id,
        title: dataForUpdate?.title,
        teacherName: dataForUpdate?.teacherName,
        teacherEmail: dataForUpdate?.teacherEmail,
        image: null,
        blogBanner: dataForUpdate?.blogBanner,
        categoryName: dataForUpdate?.categoryName,
        categoryId: dataForUpdate?.categoryId,
        description: dataForUpdate?.description
    })
    const [error, setError] = useState("");
    const imageHostingURL = `https://api.imgbb.com/1/upload?key=${imageHostingToken}`;

    const [
        updateBlog,
        { isLoading: updateBlogIsLoading, isSuccess: updateBlogIsSuccess, isError: updateBlogIsError, },
    ] = useUpdateBlogMutation();

    //showing success message
    useEffect(() => {
        if (updateBlogIsSuccess) {
            Swal.fire(
                'Blog updated Successfully!',
                'Success!',
                'success'
            )
            navigate(-1);
        }
    }, [navigate, updateBlogIsSuccess]);

    //showing error message
    useEffect(() => {
        if (updateBlogIsError) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Blog Not updated, Please try again...!',
            })
        }
    }, [updateBlogIsError]);

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
        if (!data.description) {
            setError("Description is required");
            return;
        }

        if (
            data.title == dataForUpdate?.title &&
            data?.categoryName == dataForUpdate.categoryName &&
            data?.categoryId == dataForUpdate.categoryId &&
            data.image == null &&
            data.description == dataForUpdate.description
        ) {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Please Change at least one attributes to update Course...!',
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

                        const updatedBlog = {
                            id: data.id,
                            title: data.title,
                            blogBanner: imgURL,
                            categoryId: data.categoryId,
                            categoryName: data.categoryName,
                            description: data.description,
                        }

                        try {
                            await updateBlog(updatedBlog)?.unwrap();

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
            const updatedBlog = {
                id: data.id,
                title: data.title,
                blogBanner: data.blogBanner,
                description: data.description,
                categoryId: data.categoryId,
                categoryName: data.categoryName,
            }

            try {
                await updateBlog(updatedBlog)?.unwrap();

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
                <CCard title={'Update Blog'} secondary={<CButton onClick={() => navigate(-1)} variant={'contained'}>Back</CButton>}>
                    {previewImage && (
                        <div className="relative z-40">
                            <div className="">
                                <img
                                    src={previewImage}
                                    alt="blog image"
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

                        <div className="lg:col-span-2">
                            <CFileInput
                                label="Blog Banner*"
                                onChange={handleImageChange}
                                accept="image/*"
                                files={data?.image || ""}
                            />
                        </div>

                        <div className="mt-2">
                            <CTextArea
                                onChange={(e) => {
                                    setData({ ...data, description: e.target.value });
                                }}
                                id="description"
                                placeholder="Description"
                                defaultValue={data?.description || ""}
                            />
                        </div>

                        <div className="">
                            <CButton
                                variant={"solid"}
                                type={"submit"}
                                loading={(imageUploadLoading || updateBlogIsLoading) ? true : false}
                            >
                                Update Blog
                            </CButton>
                        </div>

                    </form>
                </CCard>
            </div>
        </main>
    );
};

export default UpdateBlog;