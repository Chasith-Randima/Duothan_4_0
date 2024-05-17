// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { signup } from "@/actions/auth";
// import Modal from "@/components/Modal";

// const CreateUser = () => {
//   const router = useRouter();
//   const [values, setValues] = useState({
//     username: "",
//     email: "",
//     password: "",
//     passwordConfirm: "",
//     error: "",
//     loading: false,
//     message: "",
//   });

//   const [tempError, setTempError] = useState(false);

//   const [alert, setAlert] = useState({
//     message: "",
//     error: false,
//     loading: false,
//     success: false,
//   });

//   const resetAlert = () => {
//     setAlert({ message: "", error: false, loading: false, success: false });
//   };

//   const {
//     username,
//     email,
//     password,
//     passwordConfirm,
//     error,
//     loading,
//     message,
//   } = values;

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!values.username || values.username <= 0) {
//       setTempError(true);
//       return;
//     }
//     if (
//       !values.email ||
//       values.email.length <= 0 ||
//       !values.email
//         .toLowerCase()
//         .match(
//           /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//         )
//     ) {
//       setTempError(true);
//       return;
//     }
//     if (!values.password || values.password.length <= 0) {
//       setTempError(true);
//       return;
//     }
//     if (!values.passwordConfirm || values.passwordConfirm.length <= 0) {
//       setTempError(true);
//       return;
//     }
//     if (values?.password != values?.passwordConfirm) {
//       setTempError(true);
//       return;
//     }

//     setAlert({ ...alert, loading: true });
//     setValues({ ...values, loading: true, error: false });

//     const user = {
//       username,
//       email,
//       password,
//       passwordConfirm,
//     };
//     signup(user)
//       .then((data) => {
//         if (data.status && data.status == "success") {
//           setValues({
//             ...values,
//             username: "",
//             email: "",
//             password: "",
//             passwordConfirm: "",
//             error: "",
//             loading: false,
//             message: data.statusText,
//           });
//           setTempError(false);
//           setAlert({
//             ...alert,
//             loading: false,
//             message: data.message,
//             error: false,
//             success: true,
//           });
//           window.setTimeout(() => {
//             setAlert({ ...alert, success: false, message: "" });
//           }, 1000);

//           router.push(`/users/login`);
//         } else {
//           setAlert({
//             ...alert,
//             loading: false,
//             message: "Check your credentials..",
//             error: true,
//             success: false,
//           });
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//         setAlert({
//           ...alert,
//           loading: false,
//           message: "Check your credentials...",
//           error: true,
//           success: false,
//         });
//       });
//   };

//   const handleChange = (name) => (e) => {
//     setValues({ ...values, error: false, [name]: e.target.value });
//   };

//   let showLoading = () =>
//     loading ? <div className="alert alert-info">Loading...</div> : "";
//   let showError = () =>
//     error ? <div className="alert alert-danger">{error}</div> : "";
//   let showMessage = () =>
//     message ? <div className="alert alert-info">{message}</div> : "";

//   return (
//     <>
//       <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
//         {alert && alert?.message && (
//           <Modal alert={alert} setAlert={resetAlert} />
//         )}

//         <div className="relative py-3 sm:max-w-xl sm:mx-auto">
//           <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
//           <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
//             <div className="max-w-md mx-auto">
//               <div>
//                 <h1 className="text-2xl font-semibold">Signup to  NewsCrape.Ai</h1>
//               </div>
//               <div className="divide-y divide-gray-200">
//                 <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
//                   <div className="relative">
//                     <input
//                       autocomplete="off"
//                       id="username"
//                       name="username"
//                       type="text"
//                       value={username}
//                       onChange={handleChange("username")}
//                       className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
//                       placeholder="Username"
//                     />
//                     <label
//                       for="username"
//                       className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
//                     >
//                       Username
//                     </label>
//                   </div>
//                   <div className="relative">
//                     <input
//                       autocomplete="off"
//                       id="email"
//                       name="email"
//                       type="text"
//                       value={email}
//                       onChange={handleChange("email")}
//                       className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
//                       placeholder="Email address"
//                     />
//                     <label
//                       for="email"
//                       className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
//                     >
//                       Email Address
//                     </label>
//                   </div>
//                   <div className="relative">
//                     <input
//                       autocomplete="off"
//                       id="password"
//                       name="password"
//                       type="password"
//                       value={password}
//                       onChange={handleChange("password")}
//                       className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
//                       placeholder="Password"
//                     />
//                     <label
//                       for="password"
//                       className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
//                     >
//                       Password
//                     </label>
//                   </div>
//                   <div className="relative">
//                     <input
//                       autocomplete="off"
//                       id="passwordConfirm"
//                       name="passwordConfirm"
//                       type="password"
//                       value={passwordConfirm}
//                       onChange={handleChange("passwordConfirm")}
//                       className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
//                       placeholder="Password Confirm"
//                     />
//                     <label
//                       for="passwordConfirm"
//                       className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
//                     >
//                       Password Confirm
//                     </label>
//                   </div>
//                   <div className="relative">
//                     <button
//                       className="bg-blue-500 text-white rounded-md px-2 py-1"
//                       onClick={handleSubmit}
//                     >
//                       SignUp
//                     </button>
//                   </div>
//                   <div>
//                     <span>Already have an Account ?</span>
//                     <Link
//                       href={"/users/login"}
//                       className="bg-gray-200 rounded-xl p-2 hover:bg-gray-400 hover:text-white"
//                     >
//                       LogIn
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CreateUser;



"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signup } from "@/actions/auth";
import Modal from "@/components/Modal";
import SideBar from "@/components/SideBar";

const CreateUser = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    error: "",
    loading: false,
    message: "",
  });

  const [tempError, setTempError] = useState(false);

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
    firstName,
    lastName,
    mobileNumber,
    username,
    email,
    password,
    passwordConfirm,
    error,
    loading,
    message,
  } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.firstName || values.firstName.length <= 0) {
      setTempError(true);
      return;
    }
    if (!values.lastName || values.lastName.length <= 0) {
      setTempError(true);
      return;
    }
    if (!values.mobileNumber || values.mobileNumber.length <= 0) {
      setTempError(true);
      return;
    }
    if (!values.username || values.username.length <= 0) {
      setTempError(true);
      return;
    }
    if (
      !values.email ||
      values.email.length <= 0 ||
      !values.email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setTempError(true);
      return;
    }
    if (!values.password || values.password.length <= 0) {
      setTempError(true);
      return;
    }
    if (!values.passwordConfirm || values.passwordConfirm.length <= 0) {
      setTempError(true);
      return;
    }
    if (values?.password !== values?.passwordConfirm) {
      setTempError(true);
      return;
    }

    setAlert({ ...alert, loading: true });
    setValues({ ...values, loading: true, error: false });

    const user = {
      firstName,
      lastName,
      mobileNumber,
      username,
      email,
      password,
      passwordConfirm,
    };

    signup(user)
      .then((data) => {
        if (data.status && data.status === "success") {
          console.log(data,"created user..")
          setValues({
            ...values,
            firstName: "",
            lastName: "",
            mobileNumber: "",
            username: "",
            email: "",
            password: "",
            passwordConfirm: "",
            error: "",
            loading: false,
            message: data.statusText,
          });
          setTempError(false);
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

          router.push(`/users/admin/allUsers`)
        } else {
          setAlert({
            ...alert,
            loading: false,
            message: "Check your credentials..",
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
          message: "Check your credentials...",
          error: true,
          success: false,
        });
      });
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  let showLoading = () =>
    loading ? <div className="alert alert-info">Loading...</div> : "";
  let showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : "";
  let showMessage = () =>
    message ? <div className="alert alert-info">{message}</div> : "";

  return (
    <>
    <SideBar>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        {alert && alert?.message && (
          <Modal alert={alert} setAlert={resetAlert} />
        )}

        <div className="relative py-3 ">
          {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div> */}
          <div className=" px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold">Create a User</h1>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={firstName}
                      onChange={handleChange("firstName")}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                      placeholder="First Name"
                    />
                    <label
                      htmlFor="firstName"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      First Name
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={lastName}
                      onChange={handleChange("lastName")}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                      placeholder="Last Name"
                    />
                    <label
                      htmlFor="lastName"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Last Name
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="mobileNumber"
                      name="mobileNumber"
                      type="text"
                      value={mobileNumber}
                      onChange={handleChange("mobileNumber")}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                      placeholder="Mobile Number"
                    />
                    <label
                      htmlFor="mobileNumber"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Mobile Number
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="username"
                      name="username"
                      type="text"
                      value={username}
                      onChange={handleChange("username")}
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
                      id="email"
                      name="email"
                      type="text"
                      value={email}
                      onChange={handleChange("email")}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                      placeholder="Email address"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Email Address
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={handleChange("password")}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                      placeholder="Password"
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="passwordConfirm"
                      name="passwordConfirm"
                      type="password"
                      value={passwordConfirm}
                      onChange={handleChange("passwordConfirm")}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                      placeholder="Password Confirm"
                    />
                    <label
                      htmlFor="passwordConfirm"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Password Confirm
                    </label>
                  </div>
                  <div className="relative">
                    <button
                      className="bg-blue-500 text-white rounded-md px-2 py-1"
                      onClick={handleSubmit}
                    >
                      Create a User
                    </button>
                  </div>
                  {/* <div>
                    <span>Already have an Account ?</span>
                    <Link
                      href={"/users/login"}
                      className="bg-gray-200 rounded-xl p-2 hover:bg-gray-400 hover:text-white"
                    >
                      LogIn
                    </Link>
                  </div> */}
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

export default CreateUser;
