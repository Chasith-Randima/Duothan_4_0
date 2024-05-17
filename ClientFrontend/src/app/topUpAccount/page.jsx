// pages/PaymentPage.js
"use client"
import { useState ,useEffect} from 'react';
import { useRouter } from 'next/router';
import { getCookie } from '@/actions/auth';
import { createPayment } from '@/actions/payment'; // Assuming this function handles creating payment in the backend
import SideBar from '@/components/SideBar';





const PaymentPage = () => {


  // const [user, setUser] = useState();
  let user;
  // const { cartItems } = useContext(ShopContext);
  useEffect(() => {
    if (localStorage.getItem("user")) {
      user = JSON.parse(localStorage.getItem("user"));
    }
  }, []);

  const [values, setValues] = useState({
    dtpcode: JSON.parse(localStorage.getItem("user")).dtpCode,
    username: JSON.parse(localStorage.getItem("user")).username,
    payment_amount: 0,
    payment_type: '',
    user:JSON.parse(localStorage.getItem("user"))._id,
    created_at: new Date(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handlePaymentSuccess = async () => {
    try {
      // Call createPayment function and pass the payment data to backend
      let token = getCookie("token_user");

      let paramsData = {
        dtpcode:values.dtpcode,
        username:values.username,
        user:values.user,
        payment_amount:values.payment_amount,
        payment_type:values.payment_type,
      
      }
      

      await createPayment(paramsData,token);
      // router.push('/'); // Redirect to home page after successful payment
    } catch (error) {
      console.error('Error creating payment:', error);
      // Handle error
    }
  };

  return (
    <SideBar>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold">Make a Payment</h1>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    {JSON.parse(localStorage.getItem("user")) && <input
                      autoComplete="off"
                      id="dtpcode"
                      name="dtpcode"
                      type="text"
                      value={values.dtpcode}
                      onChange={handleChange}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                      placeholder="DTP Code"
                    />}
                    <label
                      htmlFor="dtpcode"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      DTP Code
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="username"
                      name="username"
                      type="text"
                      value={values.username}
                      onChange={handleChange}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                      placeholder="Username"
                    />
                    <label
                      htmlFor="username"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Username
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="payment_amount"
                      name="payment_amount"
                      type="number"
                      value={values.payment_amount}
                      onChange={handleChange}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                      placeholder="Payment Amount"
                    />
                    <label
                      htmlFor="payment_amount"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Payment Amount
                    </label>
                  </div>
                  <div className="relative">
                    <select
                      id="payment_type"
                      name="payment_type"
                      value={values.payment_type}
                      onChange={handleChange}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    >
                      <option value="">Select Payment Type</option>
                      <option value="Credit Card">Credit Card</option>
                      <option value="Debit Card">Debit Card</option>
                      <option value="PayPal">PayPal</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Cash">Cash</option>
                    </select>
                    <label
                      htmlFor="payment_type"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Payment Type
                    </label>
                  </div>
                  <div className="relative">
                    <button
                      className="bg-blue-500 text-white rounded-md px-2 py-1"
                      onClick={() => {
                        // Call the Stripe payment form modal
                        handlePaymentSuccess(values);
                      }}
                    >
                      Make Payment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SideBar>
  );
};

export default PaymentPage;
