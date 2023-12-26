import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../../../redux/features/cart/cartSlice";
import CButton from "../../../../utils/CButton/CButton";
import CCard from "../../../../utils/CCard/CCard";
import WarningAllert from "../../../../shared/WarningAllert";

const SelectedCourse = () => {
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    return (
        <div className="p-4">
            <CCard title={'Selected Courses'}>
                <div className="">
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Image</th>
                                    <th>Price</th>
                                    <th>Ratings</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cart.length == 0
                                    &&
                                    <WarningAllert message={'Nothing To show! Please Add some Item First'} />
                                }
                                {
                                    cart && cart.map((item) => <tr key={item._id}>

                                        <td>{item?.title}</td>
                                        <td>
                                            <div className="avatar">
                                                <div className="w-12 h-10 rounded">
                                                    <img src={item?.bannerURL} alt="course Banner" />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {item?.price} $
                                        </td>
                                        <td>
                                            {item?.rating}
                                        </td>
                                        <td>
                                            <div className="flex flex-col lg:flex-row gap-2">
                                                <CButton
                                                    onClick={() => dispatch(removeFromCart(item?._id))}
                                                    className={'bg-red-500 text-white rounded-full p-2'}
                                                >
                                                    <FaTrash className="text-lg" />
                                                </CButton>
                                                <CButton
                                                    variant={'contained'}
                                                >
                                                    Pay
                                                </CButton>
                                            </div>
                                        </td>
                                    </tr>)
                                }

                            </tbody>

                        </table>
                    </div>
                </div>
            </CCard>
        </div>
    );
};

export default SelectedCourse;