


"use client";
import { useEffect, useState } from "react";
import { withRouter } from "next/router";
import { getCookie } from "@/actions/auth";
import { getProfile, updateProfile, updateUserPassword } from "@/actions/user";
import { useSearchParams } from "next/navigation";
import SideBar from "@/components/SideBar";
import Modal from "@/components/Modal";

const Profile = () => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    username: "",
    email: "",
    country: "",
    streetAddress: "",
    city: "",
    region: "",
    postalCode: "",
    description: "",
    formData: "",
    role:""
  });

  const [userId, setUserId] = useState();
  const searchParams = useSearchParams();
  const [refresh, setRefresh] = useState(false);
  const [authValues, setAuthValues] = useState({
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });

  const [alert, setAlert] = useState({
    message: "",
    error: false,
    loading: false,
    success: false,
  });

  const resetAlert = () => {
    setAlert({ message: "", error: false, loading: false, success: false });
  };

  const {
    role,
    firstName,
    lastName,
    mobileNumber,
    username,
    email,
    country,
    streetAddress,
    city,
    postalCode,
    region,
    description,
    formData,
  } = values;

  useEffect(() => {
    setAlert({ ...alert, loading: true });
    initialProfileData();
  }, [refresh]);

  const initialProfileData = async () => {
    let token = getCookie("token_user");
    let userIdTemp;
    if (localStorage.getItem("user")) {
      userIdTemp = JSON.parse(localStorage.getItem("user"))._id;
    }
    setUserId(userIdTemp);

    await getProfile(userIdTemp, token)
      .then((data) => {
        if (data.status && data.status === "success") {
          setValues({
            firstName: data.doc.firstName,
            lastName: data.doc.lastName,
            mobileNumber: data.doc.mobileNumber,
            username: data.doc.username,
            email: data.doc.email,
            country: data.doc.country,
            streetAddress: data.doc.streetAddress,
            city: data.doc.city,
            region: data.doc.region,
            postalCode: data.doc.postalCode,
            description: data.doc.description,
            formData: new FormData(),
            images: data.doc.images,
            role:data.doc.role
          });

          setAlert({
            ...alert,
            loading: false,
            message: data.message,
            error: false,
            success: true,
          });

          window.setTimeout(() => {
            setAlert({ ...alert, success: false, message: "" });
          }, 1000);
        }
      })
      .catch((err) => {
        setAlert({
          ...alert,
          loading: false,
          message: err.message,
          error: true,
          success: false,
        });
      });
  };

  const handleChange = (name) => (e) => {
    e.preventDefault();
    let value = name === "images" ? e.target.files[0] : e.target.value;

    if (name === "images") {
      formData.append(name, value);
      setValues({ ...values, [name]: value, formData });
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert({ ...alert, loading: true });
    let token = getCookie("token_user");

    let data = {
      firstName,
      lastName,
      mobileNumber,
      username,
      email,
      country,
      streetAddress,
      city,
      postalCode,
      region,
      description,
      role,
    };

    for (const key in data) {
      formData.append(key, data[key]);
      setValues({ ...values, formData });
    }

    await updateProfile(userId, values.formData, token)
      .then((data) => {
        if (data.status && data.status === "success") {
          setRefresh(!refresh);

          setAlert({
            ...alert,
            loading: false,
            message: data.message,
            error: false,
            success: true,
          });

          window.setTimeout(() => {
            setAlert({ ...alert, success: false, message: "" });
          }, 1000);
        }
      })
      .catch((err) => {
        setAlert({
          ...alert,
          loading: false,
          message: err.message,
          error: true,
          success: false,
        });
      });
  };

  const { currentPassword, password, confirmPassword } = authValues;

  const handleAuthChange = (name) => (e) => {
    e.preventDefault();
    setAuthValues({ ...authValues, [name]: e.target.value });
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAlert({ ...alert, loading: true });

    let token = getCookie("token_user");

    let data = {
      passwordCurrent: currentPassword,
      password,
      passwordConfirm: confirmPassword,
    };

    await updateUserPassword(userId, data, token)
      .then((data) => {
        if (data.status && data.status === "success") {
          setAuthValues({
            ...authValues,
            confirmPassword: "",
            currentPassword: "",
            password: "",
          });
          setRefresh(!refresh);
          setAlert({
            ...alert,
            loading: false,
            message: data.message,
            error: false,
            success: true,
          });

          window.setTimeout(() => {
            setAlert({ ...alert, success: false, message: "" });
          }, 1000);
        }
      })
      .catch((err) => {
        setAlert({
          ...alert,
          loading: false,
          message: err.message,
          error: true,
          success: false,
        });
      });
  };

  return (
    <>
      <SideBar>
        <section className="bg-white dark:bg-gray-900">
          {alert && alert.message && <Modal alert={alert} setAlert={resetAlert} />}
          <div className="py-8 px-4 mx-auto max-w-2xl lg:pt-16 lg:pb-4">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              Update Profile
            </h2>
            <form action="#">
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="firstName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={firstName}
                    onChange={handleChange("firstName")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="First Name"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="lastName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={lastName}
                    onChange={handleChange("lastName")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Last Name"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="mobileNumber"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    name="mobileNumber"
                    id="mobileNumber"
                    value={mobileNumber}
                    onChange={handleChange("mobileNumber")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Mobile Number"
                    required
                  />
                </div>
                <div className="md:space-y-2 mb-3">
                  <label className="text-xs font-semibold text-gray-600 py-2">
                    Profile Image
                    <abbr className="hidden" title="required">
                      *
                    </abbr>
                  </label>
                  <div className="flex items-center">
                    <div className="w-24 h-24 mr-4 flex-none rounded-xl border overflow-hidden">
                      {values.images && (
                        <img
                          className="w-24 h-24 mr-4 object-cover"
                          src={`${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/users/image/${values.images[0]}`}
                          alt="Avatar Upload"
                        />
                      )}
                    </div>
                    <label className="cursor-pointer">
                      <span className="focus:outline-none text-white text-sm py-2 px-4 rounded-full bg-green-400 hover:bg-green-500 hover:shadow-lg">
                        Browse
                      </span>
                      <input
                        type="file"
                        name="images"
                        accept="image/*"
                        onChange={handleChange("images")}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    onChange={handleChange("username")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type username"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={handleChange("email")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type email"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Admin Type
                  </label>
                  <input
                    type="role"
                    name="role"
                    id="role"
                    value={role}
                    onChange={handleChange("role")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Admin Type"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows="8"
                    value={description}
                    onChange={handleChange("description")}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Your description here"
                  ></textarea>
                </div>
              </div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-gray-700 rounded-lg focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-900 hover:bg-gray-800"
              >
                Update Profile
              </button>
            </form>
          </div>
        </section>
        <hr />
        <section className="bg-white dark:bg-gray-900">
          <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              Update Password
            </h2>
            <form action="#">
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="currentPassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    id="currentPassword"
                    value={currentPassword}
                    onChange={handleAuthChange("currentPassword")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Current Password"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={handleAuthChange("password")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Password"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={handleAuthChange("confirmPassword")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Confirm Password"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                onClick={handleAuthSubmit}
                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-gray-700 rounded-lg focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-900 hover:bg-gray-800"
              >
                Update Password
              </button>
            </form>
          </div>
        </section>
      </SideBar>
    </>
  );
};

export default Profile;
