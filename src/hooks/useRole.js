import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useGetUserRoleByEmailQuery } from "../redux/features/user/userSlice";

const useRole = () => {

    const { user } = useContext(AuthContext);
    const { isLoading, data } = useGetUserRoleByEmailQuery(user?.email);

    return [isLoading, data?.roles]
    
}
export default useRole;