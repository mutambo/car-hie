import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('your-publishable-key');

const PaymentForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement!,
    });

    if (error) {
      console.error(error);
    } else {
      console.log('Payment method created:', paymentMethod);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
        Pay Now
      </button>
    </form>
  );
};

const Payment: React.FC = () => {
  return (
    <Elements stripe={stripePromise}>
      <div className="container mx-auto py-12">
        <h2 className="text-3xl font-bold mb-6">Complete Your Payment</h2>
        <PaymentForm />
      </div>
    </Elements>
  );
};

export default Payment;
