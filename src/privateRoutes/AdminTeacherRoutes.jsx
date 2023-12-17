/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useRole from "../hooks/useRole";
import { AuthContext } from "../providers/AuthProvider";
import Loading from "../utils/CLoading/Loading";

const AdminTeacherRoutes = ({children}) => {


    const {user, loading} = useContext(AuthContext);
    const [ isLoading, role] = useRole();

    const location = useLocation();

    if(loading || isLoading){
        return <Loading/>
    }

    if(user && (role==='Admin' || role==='Teacher')){
        return children
    }


    return <Navigate to="/login" state={{from:location}} replace></Navigate>;
};


export default AdminTeacherRoutes;