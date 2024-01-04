import { useContext } from "react";
import { useGetEnrolledCourseQuery } from "../../../../redux/features/payments/payments-api-slice";
import WarningAllert from "../../../../shared/WarningAllert";
import CCard from "../../../../utils/CCard/CCard";
import CSkeleton from "../../../../utils/CSkeleton/CSkeleton";
import { AuthContext } from "../../../../providers/AuthProvider";

const PaymentHistory = () => {

    const {user} = useContext(AuthContext);
    const { isLoading, data: courses, isError } = useGetEnrolledCourseQuery(user?.email);

    if (isError) return <WarningAllert message={'Payment History Not Available..!, Something went Wrong Try Again.'} />

    return (
        <div>
            <CCard title={'Payment History'}>
                {
                    isLoading
                        ?
                        <CSkeleton />
                        :
                        <div className="overflow-x-auto w-full lg:w-4/5 mx-auto">
                            <table className="table table-zebra">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Class Name</th>
                                        <th>Transaction ID</th>
                                        <th>Amount</th>
                                        <th>Time</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        courses.map((cls, indx) => <tr key={cls._id}>
                                            <th>{indx + 1}</th>
                                            <td>{cls.title}</td>
                                            <td>{cls.transactionId}</td>
                                            <td>${cls.price}</td>
                                            <td>{cls.date.slice(0,10)}</td>
                                        </tr>)
                                    }

                                </tbody>
                            </table>
                        </div>
                }

            </CCard>
        </div>
    );
};

export default PaymentHistory;