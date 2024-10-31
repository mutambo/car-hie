import { useState } from "react";
import axios from "axios";

interface CardPaymentResponse {
  message: string;
}

interface MpesaPaymentResponse {
  message: string;
}

interface AirtelPaymentResponse {
  transactionId: string;
}

const PaymentForm: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const [cardDetails, setCardDetails] = useState({ cardNumber: "", expiry: "", cvv: "" });
  const [phone, setPhone] = useState<string>("254712345678");
  const [amount, setAmount] = useState<number>(100);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleCardPayment = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post<CardPaymentResponse>('/api/local-card-payment', {
        cardNumber: cardDetails.cardNumber,
        expiry: cardDetails.expiry,
        cvv: cardDetails.cvv,
        amount: amount,
      });
      setSuccessMessage("Card payment successful: " + response.data.message);
      setError(null);
    } catch (error: any) {
      setError("Card payment failed. Please try again: " + (error.response?.data?.message || error.message));
      setSuccessMessage(null);
    }
  };

  const handleMpesaPayment = async () => {
    try {
      const response = await axios.post<MpesaPaymentResponse>('/api/mpesa-payment', {
        phone: phone,
        amount: amount,
      });
      setSuccessMessage("M-Pesa payment successful: " + response.data.message);
      setError(null);
    } catch (error: any) {
      setError("M-Pesa payment failed: " + (error.response?.data?.message || error.message));
      setSuccessMessage(null);
    }
  };

  const handleAirtelMoneyPayment = async (): Promise<AirtelPaymentResponse> => {
    try {
      const response = await axios.post<AirtelPaymentResponse>('/api/airtel-money-payment', {
        phone: phone,
        amount: amount,
      });
      return response.data;
    } catch (error: any) {
      throw new Error("Airtel Money payment failed: " + (error.response?.data?.message || error.message));
    }
  };

  const handleAirtelPayment = async () => {
    try {
      const response = await handleAirtelMoneyPayment();
      setSuccessMessage("Airtel Money payment successful: " + response.transactionId);
      setError(null);
    } catch (error: any) {
      setError(error.message);
      setSuccessMessage(null);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto mt-10 space-y-6">
      <h3 className="text-2xl font-semibold mb-6 text-center">Select Payment Method</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Local Card Payment */}
        <div className="flex flex-col bg-gray-100 p-6 rounded-lg shadow-md space-y-4">
          <button onClick={() => setPaymentMethod("card")} className={`py-2 px-4 rounded-lg ${paymentMethod === "card" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"}`}>
            Debit/Credit Card
          </button>
          {paymentMethod === "card" && (
            <form onSubmit={handleCardPayment} className="space-y-4">
              <input
                type="text"
                placeholder="Card Number"
                className="w-full p-2 border rounded-md"
                value={cardDetails.cardNumber}
                onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
              />
              <input
                type="text"
                placeholder="Expiry Date (MM/YY)"
                className="w-full p-2 border rounded-md"
                value={cardDetails.expiry}
                onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
              />
              <input
                type="text"
                placeholder="CVV"
                className="w-full p-2 border rounded-md"
                value={cardDetails.cvv}
                onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
              />
              <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg">
                Pay Now
              </button>
            </form>
          )}
        </div>

        {/* M-Pesa Payment */}
        <div className="flex flex-col bg-gray-100 p-6 rounded-lg shadow-md space-y-4">
          <button onClick={() => setPaymentMethod("mpesa")} className={`py-2 px-4 rounded-lg ${paymentMethod === "mpesa" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"}`}>
            M-Pesa
          </button>
          {paymentMethod === "mpesa" && (
            <button className="w-full py-2 bg-green-500 text-white rounded-lg" onClick={handleMpesaPayment}>
              Pay with M-Pesa
            </button>
          )}
        </div>

        {/* Airtel Money Payment */}
        <div className="flex flex-col bg-gray-100 p-6 rounded-lg shadow-md space-y-4">
          <button onClick={() => setPaymentMethod("airtelmoney")} className={`py-2 px-4 rounded-lg ${paymentMethod === "airtelmoney" ? "bg-red-500 text-white" : "bg-gray-200 text-gray-600"}`}>
            Airtel Money
          </button>
          {paymentMethod === "airtelmoney" && (
            <button 
              className="w-full py-2 bg-red-500 text-white rounded-lg" 
              onClick={handleAirtelPayment}
            >
              Pay with Airtel Money
            </button>
          )}
        </div>
      </div>

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      {successMessage && <p className="text-green-500 mt-4 text-center">{successMessage}</p>}
    </div>
  );
};

export default PaymentForm;
