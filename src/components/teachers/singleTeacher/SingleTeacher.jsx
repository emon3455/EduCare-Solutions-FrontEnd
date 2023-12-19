/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import Loading from "../../../utils/CLoading/Loading";
import { useGetUserByIdQuery } from "../../../redux/features/user/user-api-slice";
import UserDetails from "../../UserDetails";

const SingleTeacher = () => {
    const params = useParams();
    const { isLoading, data: user, } = useGetUserByIdQuery(params?.id)

    return (
        <>
            {
                isLoading
                    ?
                    <Loading />
                    :
                    <UserDetails user={user}/>
            }
        </>
    );
};

export default SingleTeacher;