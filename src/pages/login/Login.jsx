import { useState } from "react";
import login from "../../../public/login.jpg"
import { useForm } from "react-hook-form";
import { FaEyeSlash, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {

    const [hide, setHide] = useState(true);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(data);
    };

    return (
        <>
            <div className="absolute top-5 left-5 text-white z-20">
                <Link to="/" className="text-secondary text-2xl"><FaHome/></Link>
            </div>
            <section className="flex flex-col lg:flex-row min-h-screen">

                <div className="hidden lg:flex bg-primary min-h-screen w-full lg:w-1/2  justify-center items-center relative">
                    <div className="w-full lg:w-3/5">
                        <img src={login} alt="login image" className="w-full rounded" />
                    </div>
                </div>

                <div className="bg-white min-h-screen w-full lg:w-1/3 mx-auto grid grid-cols-1 items-center p-2">
                    <div className="border rounded">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body ">
                            <h2 className="text-xl lg:text-xl font-bold text-center">Welcome To <span className="text-secondary">Edu-Care</span> Solution</h2>
                            <div className="form-control ">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" name="email" {...register("email", { required: true })} className="input input-bordered  rounded" />
                                {errors.email && <span className="text-red-600 ">email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={`${hide ? 'password' : 'text'}`}
                                        {...register('password', {
                                            required: true,
                                            minLength: 6,
                                            maxLength: 20,
                                            pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                                        })}
                                        placeholder="password"
                                        className="input input-bordered w-full rounded"
                                    />
                                    <span
                                        onClick={() => setHide(!hide)}
                                        className="btn btn-ghost border border-l-0 border-collapse absolute right-0"
                                    >
                                        <FaEyeSlash />
                                    </span>
                                </div>
                                {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                                {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                                {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                                {errors.password?.type === 'pattern' && (
                                    <span className="text-red-600 text-xs">Password must contain Uppercase, lowercase, number and special character.</span>
                                )}
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