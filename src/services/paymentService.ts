// src/services/paymentService.ts
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('your-publishable-key');

export const createPaymentIntent = async (amount: number) => {
  try {
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    });

    if (!response.ok) throw new Error('Payment Intent creation failed');

    const { clientSecret } = await response.json();
    return clientSecret;
  } catch (error) {
    throw error;
  }
};

export const confirmPayment = async (clientSecret: string, cardElement: any) => {
  const stripe = await stripePromise;
  const result = await stripe?.confirmCardPayment(clientSecret, {
    payment_method: {
      card: cardElement,
    },
  });
  return result;
};
