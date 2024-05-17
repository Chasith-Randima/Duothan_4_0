"use client";

import { punchCard,createPunch } from "@/actions/punch"; // Assuming this function handles the punching card action
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Modal from "@/components/Modal";
import { getCookie } from "@/actions/auth";
import SideBar from "@/components/SideBar";

const PunchCard = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    userId: "",
    longitude: "-89.533073",
    latitude: "43.097431",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });
  const [user, setUser] = useState();
  // const { cartItems } = useContext(ShopContext);
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
      setValues({...values,userId:JSON.parse(localStorage.getItem("user"))._id})
    }
  }, []);

  const [alert, setAlert] = useState({
    message: "",
    error: false,
    loading: false,
    success: false,
  });

  const [tempError, setTempError] = useState(false);

  useEffect(() => {
    // If needed, add any initialization logic here
  }, []);

  const resetAlert = () => {
    setAlert({ message: "", error: false, loading: false, success: false });
  };

  const { userId, longitude, latitude, error, loading, message, showForm } = values;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setTempError(true);
      setValues({
        ...values,
        loading: false,
        error: true,
        message: "Please provide a valid user ID.",
      });
      return;
    }

    if (!longitude || !latitude || isNaN(longitude) || isNaN(latitude)) {
      setTempError(true);
      setValues({
        ...values,
        loading: false,
        error: true,
        message: "Please provide valid coordinates.",
      });
      return;
    }

    setValues({ ...values, loading: false, error: true, message: "Loading.." });
    const paramasData = {
      userId,
      location: {
        type: "Point",
        coordinates: [parseFloat(longitude), parseFloat(latitude)],
      },
    };
    let token;
    if (getCookie("token_user")) {
        token = getCookie("token_user");
    }

  

    await createPunch(paramasData,token)
      .then((data) => {
        console.log(data);
        if (data.status && data.status === "success") {
          setAlert({
            ...alert,
            loading: false,
            message: data.message,
            error: false,
            success: true,
          });
          setTempError(false);
          window.setTimeout(() => {
            setAlert({ ...alert, success: false, message: "" });
          }, 1500);

          router.push(`/`);
        } else {
          setAlert({
            ...alert,
            loading: false,
            message: "Failed to punch card, please try again.",
            error: true,
            success: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setAlert({
          ...alert,
          loading: false,
          message: "Failed to punch card, please try again.",
          error: true,
          success: false,
        });
      });
  };

  const handleChange = (name) => (e) => {
    e.preventDefault();
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  return (
    <>
    <SideBar>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        {alert && alert?.message && (
          <Modal alert={alert} setAlert={resetAlert} />
        )}
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold">Punch Your Card</h1>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      autocomplete="off"
                      id="userId"
                      name="userId"
                      type="text"
                      value={userId}
                      onChange={handleChange("userId")}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="User ID"
                    />
                    <label
                      for="userId"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      User ID
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      autocomplete="off"
                      id="longitude"
                      name="longitude"
                      type="text"
                      value={longitude}
                      onChange={handleChange("longitude")}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Longitude"
                    />
                    <label
                      for="longitude"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Longitude
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      autocomplete="off"
                      id="latitude"
                      name="latitude"
                      type="text"
                      value={latitude}
                      onChange={handleChange("latitude")}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Latitude"
                    />
                    <label
                      for="latitude"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Latitude
                    </label>
                  </div>
                  <div className="relative">
                    <button
                      className="bg-blue-500 text-white rounded-md px-2 py-1"
                      onClick={handleSubmit}
                    >
                      Punch Card
                    </button>
                  </div>
                  <div>
                    <Link
                      href={"/"}
                      className="bg-gray-200 rounded-xl p-2 hover:bg-gray-400 hover:text-white"
                    >
                      Go Back Home
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </SideBar>
    </>
  );
};

export default PunchCard;
