/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import CInput from "../../../../utils/CInput/CInput";
import { AuthContext } from "../../../../providers/AuthProvider";
import useRole from "../../../../hooks/useRole";
import Loading from "../../../../utils/CLoading/Loading";
import Swal from "sweetalert2";
import { FaTimes } from "react-icons/fa";
import CFileInput from "../../../../utils/CFileInput/CFileInput";
import { skills } from "../../../../constant/skills";
import CSelect from "../../../../utils/CSelect/CSelect";
import CTextArea from "../../../../utils/CTextArea/CTextArea";
import CButton from "../../../../utils/CButton/CButton";
const imageHostingToken = import.meta.env.VITE_IMAGE_UPLOAD_TOKEN;

const AddCourses = ({ setOpen, refetch }) => {

    const [roleIsLoading, role] = useRole()
    const { user } = useContext(AuthContext);
    const [previewImage, setPreviewImage] = useState(null);
    const [data, setData] = useState({
        title: "",
        teacherName: user?.displayName || "",
        teacherEmail: user?.email || "",
        image: "",
        videoURL: "",
        categoryName: skills[1],
        categoryId: "",
        descreption: ""
    })
    const [error, setError] = useState("")
    const imageHostingURL = `https://api.imgbb.com/1/upload?key=${imageHostingToken}`;


    if (roleIsLoading) return <Loading />


    const handleSubmit = (e) => {
        e.preventDefault();

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
                    console.log(imgURL);

                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Image Not Uploaded...!',
                    })
                    return;
                }
            })
            .catch(er => { console.log(er.message) })


        setOpen(false); //it will close the modal
        refetch(); //it will refetch the classes data
    }

    const handleImageChange = (e) => {
        const selectedImageFile = e.target.files[0];
        e.target.value = null;

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
                        options={skills?.map((subject) => ({
                            value: subject,
                            label: subject,
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
                    <CButton variant={"solid"} type={"submit"} 
                    // loading={isLoading}
                    >
                        Add Course
                    </CButton>
                </div>

            </form>
        </main>
    );
};

export default AddCourses;