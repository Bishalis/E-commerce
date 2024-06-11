import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckOutForm";
import "./Stripe.css";
import { useDispatch, useSelector } from "react-redux";
import {  resetOrder, selectcurrentOrder } from "../features/orders/OrdersSlice";
import { resetCardAsync } from "../features/Cart/CartSlice";


// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51P8WZiFecWcDo3p340d05PsGh4L9XtGe8nZoiOXnc51RbL7hQ1ZIeciMG3994MrgEWy2LwkMYARNy3qmlM9rTxpW00fB5ZbZjK");

export default function StripeCheckout() {
  const [clientSecret, setClientSecret] = useState("");
  const currentOrder = useSelector(selectcurrentOrder)
const dispatch = useDispatch();


  useEffect(() => {
      // Create PaymentIntent as soon as the page loads
      fetch("http://localhost:8080/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({totalAmount:currentOrder.totalAmount, orderId :currentOrder.id})
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret))
        dispatch(resetCardAsync())
        dispatch(resetOrder()) 
    }, []);

    

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="stripe">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}