import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLoaderData } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PAYMENT_PK);

const Payment = () => {

    const cls = useLoaderData();

    return (
        <div>
            <Elements stripe={stripePromise}>
                <CheckoutForm cls={cls} price={cls?.price || 0}/>
            </Elements>
        </div>
    );
};

export default Payment;