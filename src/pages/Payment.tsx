import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('your-publishable-key');

// Define M-Pesa API constants
const MPESA_CONSUMER_KEY = 'your-consumer-key';
const MPESA_CONSUMER_SECRET = 'your-consumer-secret';
const MPESA_SHORTCODE = 'your-shortcode';
const MPESA_PASSKEY = 'your-passkey';
const MPESA_CALLBACK_URL = 'your-callback-url';

// Define Airtel Money API constants
const AIRTEL_API_KEY = 'your-api-key';
const AIRTEL_SECRET_KEY = 'your-secret-key';
const AIRTEL_CALLBACK_URL = 'your-callback-url';

// Define Types for API Responses
interface MpesaResponse {
  CustomerMessage: string;
}

interface AirtelResponse {
  transactionId: string;
}

// M-Pesa API Functions
async function getMpesaToken(): Promise<string> {
  const auth = Buffer.from(`${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`).toString('base64');
  const response = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
    headers: { Authorization: `Basic ${auth}` }
  });
  return (response.data as { access_token: string }).access_token; // Type assertion
}

async function initiateMpesaPayment(phoneNumber: string, amount: number): Promise<MpesaResponse> {
  try {
    const accessToken = await getMpesaToken();
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
    const password = Buffer.from(`${MPESA_SHORTCODE}${MPESA_PASSKEY}${timestamp}`).toString('base64');

    const response = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      {
        BusinessShortCode: MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: phoneNumber,
        PartyB: MPESA_SHORTCODE,
        PhoneNumber: phoneNumber,
        CallBackURL: MPESA_CALLBACK_URL,
        AccountReference: 'Order123',
        TransactionDesc: 'Payment for services'
      },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    return response.data as MpesaResponse; // Type assertion
  } catch (error: any) {
    console.error('M-Pesa Error:', error);
    throw new Error(error.response?.data?.errorMessage || 'M-Pesa payment failed');
  }
}

// Airtel Money API Functions
async function getAirtelToken(): Promise<string> {
  const response = await axios.post(
    'https://openapi.airtel.africa/auth/oauth2/token',
    { client_id: AIRTEL_API_KEY, client_secret: AIRTEL_SECRET_KEY, grant_type: 'client_credentials' }
  );
  return (response.data as { access_token: string }).access_token; // Type assertion
}

async function initiateAirtelMoneyPayment(phoneNumber: string, amount: number): Promise<AirtelResponse> {
  try {
    const accessToken = await getAirtelToken();

    const response = await axios.post(
      'https://openapi.airtel.africa/standard/v1/payments/',
      {
        reference: 'Order123',
        subscriber: { country: 'KE', currency: 'KES', msisdn: phoneNumber },
        transaction: { amount, country: 'KE', currency: 'KES' },
        callback: AIRTEL_CALLBACK_URL
      },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    return response.data as AirtelResponse; // Type assertion
  } catch (error: any) {
    console.error('Airtel Money Error:', error);
    throw new Error(error.response?.data?.message || 'Airtel Money payment failed');
  }
}

// Payment Form Component
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
      setError('Card payment failed. Please try again.');
      setSuccessMessage(null);
    }
  };

  const handleMpesaPayment = async () => {
    try {
      const response = await initiateMpesaPayment('254712345678', 100); // Replace with dynamic phone and amount
      setSuccessMessage('M-Pesa payment successful: ' + response.CustomerMessage);
      setError(null);
    } catch (error: any) {
      setError(error.message);
      setSuccessMessage(null);
    }
  };

  const handleAirtelMoneyPayment = async () => {
    try {
      const response = await initiateAirtelMoneyPayment('254712345678', 100); // Replace with dynamic phone and amount        
      setSuccessMessage('Airtel Money payment successful: ' + response.transactionId);
      setError(null);
    } catch (error: any) {
      setError(error.message);
      setSuccessMessage(null);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-6">
      <h3 className="text-xl font-semibold mb-4 text-center">Select Payment Method</h3>
      <div className="flex flex-col space-y-4">
        <div className="p-4 border rounded-lg shadow-md bg-gray-100">
          <button onClick={() => setPaymentMethod('card')} className={`w-full py-2 rounded-lg ${paymentMethod === 'card' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
            Credit/Debit Card
          </button>
          {paymentMethod === 'card' && (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <CardElement className="p-3 border rounded-md" />
              </div>
              <button type="submit" disabled={!stripe} className="w-full py-2 bg-blue-600 text-white rounded-lg">
                Pay Now
              </button>
            </form>
          )}
        </div>

        <div className="p-4 border rounded-lg shadow-md bg-gray-100">
          <button onClick={() => setPaymentMethod('mpesa')} className={`w-full py-2 rounded-lg ${paymentMethod === 'mpesa' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
            M-Pesa
          </button>
          {paymentMethod === 'mpesa' && (
            <button className="w-full py-2 mt-4 bg-green-500 text-white rounded-lg" onClick={handleMpesaPayment}>
              Pay with M-Pesa
            </button>
          )}
        </div>

        <div className="p-4 border rounded-lg shadow-md bg-gray-100">
          <button onClick={() => setPaymentMethod('airtelmoney')} className={`w-full py-2 rounded-lg ${paymentMethod === 'airtelmoney' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}>
            Airtel Money
          </button>
          {paymentMethod === 'airtelmoney' && (
            <button className="w-full py-2 mt-4 bg-red-500 text-white rounded-lg" onClick={handleAirtelMoneyPayment}>
              Pay with Airtel Money
            </button>
          )}
        </div>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
    </div>
  );
};

const Payment: React.FC = () => {
  return (
    <Elements stripe={stripePromise}>
      <div className="flex flex-col min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/path/to/your/background-image.jpg')" }}>
        <div className="flex-grow flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Complete Your Payment</h2>
          <PaymentForm />
        </div>
      </div>
    </Elements>
  );
};

export default Payment;
