import * as React from "react";
import { useSelector } from "react-redux";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import Button from "./Button";

import { selectCurrentUser } from "../store/user/userSelector";
import { selectCartTotal } from "../store/cart/cartSelector";

function PaymentForm() {
	const stripe = useStripe();
	const elements = useElements();

	const currentUser = useSelector(selectCurrentUser);
	const amount = useSelector(selectCartTotal);

	const [isProcessingPayment, setIsProcessingPayment] = React.useState(false);

	async function handlePayment(event) {
		event.preventDefault();

		if (stripe && elements) {
			setIsProcessingPayment(true);

			const response = await fetch(
				"/.netlify/functions/create-payment-intent",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						//? Convert dollars to cents
						amount: amount * 100,
					}),
				}
			).then((res) => res.json());

			const clientSecret = response.paymentIntent.client_secret;

			const paymentResult = await stripe.confirmCardPayment(clientSecret, {
				payment_method: {
					card: elements.getElement(CardElement),
					billing_details: {
						name: currentUser?.displayName || "Guest User",
					},
				},
			});

			setIsProcessingPayment(false);

			if (paymentResult.error) {
				alert(paymentResult.error);
			} else if (paymentResult.paymentIntent.status === "succeeded") {
				alert("Payment Succeeded!");
			}
		}
	}

	return (
		<div className="h-72 flex flex-col justify-center items-center">
			<form onSubmit={handlePayment} className="min-w-[500px] h-24">
				<h2 className="my-2 mx-0 text-xl font-bold">Credit Card Payment: </h2>
				<CardElement />
				<Button
					theme="inverted"
					className="ml-auto mt-7"
					disabled={isProcessingPayment}
				>
					Pay Now
				</Button>
			</form>
		</div>
	);
}

export default PaymentForm;
