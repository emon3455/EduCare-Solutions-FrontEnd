/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../utils/CLoading/Loading";



const PrivateRoutes = ({children}) => {

    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return <Loading/>
    }

    if(user){
        return children
    }

    return <Navigate to="/login" state={{from:location}} replace></Navigate>;
};

export default PrivateRoutes;