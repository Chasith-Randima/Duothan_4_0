

"use client";
import { useEffect, useState } from "react";
import { getCookie } from "@/actions/auth";
import { getProfile } from "@/actions/user";
import SideBar from "@/components/SideBar";
import Modal from "@/components/Modal";
import Map from "@/components/Map";
import { useSearchParams } from "next/navigation";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const searchParams = useSearchParams();
  const [paramsData, setParamsData] = useState({
    userId: searchParams.get("userId"),

  });
  const [alert, setAlert] = useState({
    message: "",
    error: false,
    loading: false,
    success: false,
  });

  useEffect(() => {
    setAlert({ ...alert, loading: true });
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    let token = getCookie("token_user");
    // let userId;
    // if (localStorage.getItem("user")) {
    //   userId = JSON.parse(localStorage.getItem("user"))._id;
    // }

    try {
      const response = await getProfile(paramsData.userId, token);
      if (response.status === "success") {
        setUserData(response.doc);
        setAlert({
          ...alert,
          loading: false,
          message: response.message,
          success: true,
        });
        window.setTimeout(() => {
          setAlert({ ...alert, success: false, message: "" });
        }, 1000);
      } else {
        setAlert({
          ...alert,
          loading: false,
          message: response.message,
          error: true,
        });
      }
    } catch (error) {
      setAlert({
        ...alert,
        loading: false,
        message: error.message,
        error: true,
      });
    }
  };

  return (
    <>
      <SideBar>
        <section>
          <div className="mt-10">
          <h2 className="px-6 py-4 pb-4 text-xl font-medium border-b border-gray-300 dark:border-gray-700 dark:text-gray-400">
                 <span className="text-4xl">Hello!....</span><span className="text-4xl font-bold capitalize"> {userData && userData.username}</span>
                </h2>
          </div>
        </section>
        <section className="">
          {paramsData && paramsData?.userId && <Map userId={paramsData.userId}/>}
        </section>
        <section className="bg-white dark:bg-gray-900">
          {alert && alert.message && <Modal alert={alert} />}
          <div className="py-8 px-4 mx-auto max-w-2xl lg:pt-16 lg:pb-4">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              User Profile
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  First Name
                </label>
                <p className="text-lg text-gray-800 dark:text-white">
                  {userData.firstName}
                </p>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Last Name
                </label>
                <p className="text-lg text-gray-800 dark:text-white">
                  {userData.lastName}
                </p>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Mobile Number
                </label>
                <p className="text-lg text-gray-800 dark:text-white">
                  {userData.mobileNumber}
                </p>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Username
                </label>
                <p className="text-lg text-gray-800 dark:text-white">
                  {userData.username}
                </p>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <p className="text-lg text-gray-800 dark:text-white">
                  {userData.email}
                </p>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Description
                </label>
                <p className="text-lg text-gray-800 dark:text-white">
                  {userData.description}
                </p>
              </div>
            </div>
          </div>
        </section>
      </SideBar>
    </>
  );
};

export default Profile;
