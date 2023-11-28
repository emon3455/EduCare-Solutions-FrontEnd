import { useContext, useState } from "react";
import { FaEye, FaEyeSlash, FaHome } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CInput from "../../components/customComponent/CInput";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";

const Login = () => {

    const [hide, setHide] = useState(true);
    const { signInUser } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState("")

    const handleSubmit = (e) => {
        setError("");
        e.preventDefault();
        console.log(data);
        if (!data.email) {
            setError("Email Is Required")
            return;
        }

        if (!data.password) {
            setError("Password Is Required")
            return;
        }
        if (data.password) {
            if (data.password.length < 6) {
                setError("Password must contain at least 6 characters");
                return
            }
            const regXPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{6,}$/;
            if (!regXPass.test(data.password)) {
                setError("Password Must Contain: Capital Latter, Small Latter, Number and Special Character");
                return;
            }
        }
        signInUser(data.email, data.password)
            .then(res => {
                const logedUser = res.user;
                if (logedUser) {
                    Swal.fire(
                        'Successfully Loged In!',
                        'Success!',
                        'success'
                    )
                    e.target.reset();
                    navigate(from, { replace: true });
                }
                else {
                    return;
                }
            })
            .catch(er => {
                if (er.message == "Firebase: Error (auth/invalid-login-credentials).") {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `Invalid User Credentials`,
                    })
                }
                console.log(er);
            })
    }

    return (
        <>
            <div className="absolute top-5 left-5 text-white z-20">
                <Link to="/" className="text-secondary text-2xl"><FaHome /></Link>
            </div>
            <section className="flex flex-col lg:flex-row min-h-screen">

                <div className="hidden lg:flex bg-primary min-h-screen w-full lg:w-1/2  justify-center items-center relative">
                    <div className="w-full lg:w-3/5">
                        <img src="https://i.ibb.co/NY52zhV/login.jpg" alt="login image" className="w-full rounded" />
                    </div>
                </div>

                <div className="bg-white min-h-screen w-full lg:w-2/5 mx-auto grid grid-cols-1 items-center p-2">
                    <div className="border rounded">
                        <form onSubmit={handleSubmit} className="card-body ">
                            <h2 className="text-xl lg:text-xl font-bold text-center">Welcome To <span className="text-secondary">Edu-Care</span> Solution</h2>

                            <p className="text-xs text-red-600 text-center">
                                {error}
                            </p>

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
                                            setError("");
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
                                <input type="submit" value="Login" className="btn-primary" />
                            </div>

                        </form>
                        <p className="text-center my-2 text-sm">
                            Don&apos;t Have an Account ? <Link to="/register" className="text-secondary">Register</Link>
                        </p>
                    </div>
                </div>

            </section>
        </>
    );
};

export default Login;