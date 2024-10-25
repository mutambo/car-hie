import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('your-publishable-key');

const PaymentForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentMethod, setPaymentMethod] = useState<string>('card');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) {
      setError('Stripe has not loaded yet. Please try again.');
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) throw error;
      
      setSuccessMessage('Payment method created successfully!');
      setError(null);
    } catch (error) {
      console.error(error);
      setError(error instanceof Error ? error.message : 'An error occurred');
      setSuccessMessage(null);
    }
  };

  // Mock functions for M-Pesa and Airtel Money payment handling
  const handleMpesaPayment = async () => {
    try {
      // Mock API call to M-Pesa payment gateway
      // Replace this with actual API integration logic
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccessMessage('M-Pesa payment successful!');
      setError(null);
    } catch (error) {
      console.error(error);
      setError('M-Pesa payment failed. Please try again.');
      setSuccessMessage(null);
    }
  };

  const handleAirtelMoneyPayment = async () => {
    try {
      // Mock API call to Airtel Money payment gateway
      // Replace this with actual API integration logic
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccessMessage('Airtel Money payment successful!');
      setError(null);
    } catch (error) {
      console.error(error);
      setError('Airtel Money payment failed. Please try again.');
      setSuccessMessage(null);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
      <h3 className="text-xl font-semibold mb-4 text-center">Select Payment Method</h3>
      <div className="flex justify-around mb-6">
        <button
          onClick={() => setPaymentMethod('card')}
          className={`py-2 px-4 rounded-lg ${paymentMethod === 'card' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Credit/Debit Card
        </button>
        <button
          onClick={() => setPaymentMethod('mpesa')}
          className={`py-2 px-4 rounded-lg ${paymentMethod === 'mpesa' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
        >
          M-Pesa
        </button>
        <button
          onClick={() => setPaymentMethod('airtelmoney')}
          className={`py-2 px-4 rounded-lg ${paymentMethod === 'airtelmoney' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
        >
          Airtel Money
        </button>
      </div>

      {paymentMethod === 'card' && (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <CardElement className="p-3 border rounded-md" />
          </div>
          <button type="submit" disabled={!stripe} className="w-full py-2 mt-4 bg-blue-600 text-white rounded-lg">
            Pay Now
          </button>
        </form>
      )}

      {paymentMethod === 'mpesa' && (
        <div className="text-center">
          <button className="w-full py-2 mt-4 bg-green-500 text-white rounded-lg" onClick={handleMpesaPayment}>
            Pay with M-Pesa
          </button>
        </div>
      )}

      {paymentMethod === 'airtelmoney' && (
        <div className="text-center">
          <button className="w-full py-2 mt-4 bg-red-500 text-white rounded-lg" onClick={handleAirtelMoneyPayment}>
            Pay with Airtel Money
          </button>
        </div>
      )}

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
    </div>
  );
};

const Payment: React.FC = () => {
  return (
    <Elements stripe={stripePromise}>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Complete Your Payment</h2>
        <PaymentForm />
      </div>
    </Elements>
  );
};

export default Payment;
