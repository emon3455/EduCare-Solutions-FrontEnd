/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../providers/AuthProvider";
import { useAddPaymentIntentMutation, useAddPaymentsMutation } from "../../../../redux/features/payments/payments-api-slice";
import Swal from "sweetalert2";
import CButton from "../../../../utils/CButton/CButton";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../../../redux/features/cart/cartSlice";

const CheckoutForm = ({ cls, price }) => {

    const naviagte = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(AuthContext);
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const dispatch = useDispatch();

    const [
        addPaymentIntent,
    ] = useAddPaymentIntentMutation();
    const [
        addPayments, { isSuccess:paymentIsSuccess, isError:paymentIsError}
    ] = useAddPaymentsMutation();

    useEffect(() => {
        const handlePaymentIntent=async(price)=>{
            const res = await addPaymentIntent({price})?.unwrap();
            if(res){
                setClientSecret(res?.clientSecret);
            }
        }

        if (price > 0) {
            handlePaymentIntent(price);
        }
        
    }, [price, addPaymentIntent])

    //showing success message
    useEffect(() => {
        if (paymentIsSuccess) {
            Swal.fire(
                'Payment Is Successfully Done!',
                'Success!',
                'success'
            )
            dispatch(removeFromCart(cls._id));
            naviagte("/dashboard/enrolledCourses")
        }
    }, [paymentIsSuccess, naviagte, dispatch, cls]);

    //showing error message
    useEffect(() => {
        if (paymentIsError) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Course Not Enrolled, Please try again...!',
            })
        }
    }, [paymentIsError]);


    const handleSubmit = async (event) => {

        setCardError("");
        event.preventDefault();

        setProcessing(true);
        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return
        }

        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('error', error)
            setCardError(error.message);
        }
        else {
            setCardError('');
            // console.log('payment method', paymentMethod)
        }

        setProcessing(true);
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'unknown',
                        name: user?.displayName || 'anonymous'
                    },
                },
            },
        );

        if (confirmError) {
            console.log(confirmError);
        }

        setProcessing(false)
        if (paymentIntent.status === 'succeeded') {
            // save payment information to the server
            const payment = {
                classId: cls?._id,
                title: cls?.title,
                bannerURL: cls?.bannerURL,
                studentEmail: user?.email,
                studentName: user?.displayName,
                teacherName: cls?.teacherName,
                teacherEmail: cls?.teacherEmail,
                price: parseFloat(cls?.price),
                transactionId: paymentIntent?.id,
                date: new Date(),
                categoryName: cls?.categoryName,
                categoryId: cls?.categoryId
            }

            const handleSavePaymentToDB= async(paymentInfo)=>{
                await addPayments(paymentInfo)?.unwrap();
            }
            handleSavePaymentToDB(payment);

        }


    }


    return (
        <div className="p-2">
            <h2 className="text-4xl font-bold text-center my-5">Please <span className="text-violet-500">Pay</span></h2>
            <form className="card my-10 shadow-lg shadow-gray-400/50 w-full lg:w-2/3 mx-auto p-8" onSubmit={handleSubmit}>
                <CardElement
                    className="input"
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },

                        },
                    }}
                />
                <div className="text-center">
                    <CButton fullWidth={true} variant={'contained'} style={{marginTop:"15px"}} type="submit" disabled={!stripe || !clientSecret || processing}>
                        Pay
                    </CButton>
                </div>
            </form>

            <div className="card shadow-2xl my-5 p-2 w-full lg:w-1/3 mx-auto">
                {
                    cardError && <p className="text-red-600 text-center">{cardError}</p>
                }
                {
                    processing &&
                    <>
                        <div className="h-40 w-full flex flex-col justify-center items-center">
                            <h2 className="text-2xl font-semibold text-violet-600 text-center">Please Wait....</h2>
                            <progress className="progress w-56"></progress>
                        </div>
                    </>
                }
            </div>


        </div>
    );
};

export default CheckoutForm;