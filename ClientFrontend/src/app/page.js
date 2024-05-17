// "use client";
// import { allArticles,searchArticles } from "@/actions/article";
// import { useState, useEffect } from "react";
// import { getCookie } from "@/actions/auth";
// import Modal from "@/components/Modal";
// // import SearchProduct from "@/components/SearchProduct";

// import ProductCard from "@/components/ProductCard";
// import { brands } from "@/constants";
// import { basicScrape,scrapeOne } from "@/actions/scrape";
// import { newBasicScrape,newScrapeOne } from "@/actions/newScrape";
// import ProductDetailsCard from "@/components/ProductDetailsCard";
// import SideBar from "@/components/SideBar";
// // import ShowMore from "@/components/ShowMore";
// // import SearchBar from "@/components/Searchbar";
// // import CustomFilter from "@/components/CustomFilter";
// // import Hero from "@/components/Hero";

// export default function Home({ searchParams }) {
//   // const allCars = await fetchCars({
//   //   manufacturer: searchParams.manufacturer || "",
//   //   year: searchParams.year || 2022,
//   //   fuel: searchParams.fuel || "",
//   //   limit: searchParams.limit || 10,
//   //   model: searchParams.model || "",
//   // });

//   const [filterValues, setFilterValues] = useState({
//     category: "",
//     brand: "",
//     price: "",
//     sort: "",
//     publisher:""
//   });

//   const [searchValues, setSearchValues] = useState({
//     search: "",
//   });

//   const { search } = searchValues;

//   const { category, brand, price, sort ,publisher} = filterValues;

//   const [allData, setAllData] = useState();
//   const [show, setShow] = useState(false);
//   const [limit, setLimit] = useState(9);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState();
//   const [searchClean, setSearchClean] = useState(false);

//   const [alert, setAlert] = useState({
//     message: "",
//     error: false,
//     loading: false,
//     success: false,
//   });

//   const [view,setView] = useState("quickView")
//   const [user,setUser] = useState()

//   useEffect(() => {
//     if (localStorage.getItem("user")) {
//       setUser(JSON.parse(localStorage.getItem("user")));
//     }
//   }, []);
//   const resetAlert = () => {
//     setAlert({ message: "", error: false, loading: false, success: false });
//   };
//   const initialSet = () => {
//     setAllData(data);
//   };

//   const handleChange = (name) => (e) => {
//     e.preventDefault();
//     setFilterValues({ ...filterValues, [name]: e.target.value });
//   };

//   const handleSearch = (name) => (e) => {
//     e.preventDefault();
//     setSearchValues({ ...searchValues, [name]: e.target.value });
//   };

//   // ---------------pagination--------------------------
//   const nextPage = () => {
//     setPage((oldPage) => {
//       let nextPage = oldPage + 1;
//       if (nextPage > totalPages) {
//         nextPage = 1;
//       }
//       return nextPage;
//     });
//   };
//   const prevPage = () => {
//     setPage((oldPage) => {
//       let prevPage = oldPage - 1;
//       if (prevPage <= 1) {
//         prevPage = totalPages;
//       }
//       return prevPage;
//     });
//   };

//   // ---------------pagination--------------------------

//   useEffect(() => {
//     if (search.length == 0) {
//       setSearchClean(true);
//       handleSubmit();
//       setSearchClean(false);
//     } else {
//       handleSearchSubmit();
//     }
//   }, [searchValues]);

//   const handleSearchSubmit = async () => {
//     // e.preventDefault();
//     // console.log("triggerd..");
//     // console.log(search);
//     await searchArticles({ search: search })
//       .then((data) => {
//         // console.log(data, "from search results");
//         // console.log(data);
//         if (data.status && data.status == "success") {
//           if (data.results == 0) {
//             setAlert({
//               ...alert,
//               loading: false,
//               message: data.message,
//               error: false,
//               success: true,
//             });

//             window.setTimeout(() => {
//               resetAlert();
//             }, 1000);
//           } else {
//             setAllData(data.data);
//             // console.log(data);
//             // let totalCount = data.totalCount;
//             // setTotalPages(Math.ceil(totalCount / limit));
//             setShow(false);
//           }
//           setAlert({
//             ...alert,
//             loading: false,
//             message: data.message,
//             error: false,
//             success: true,
//           });

//           window.setTimeout(() => {
//             resetAlert();
//           }, 1000);
//         }

//         // console.log(allData);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   useEffect(() => {
//     // console.log("page changed...", page);

//     handleSubmit();
//     // console.log(allData);
//   }, [page, filterValues]);

//   const resetFilter = () => {
//     setFilterValues({ category: "", brand: "", price: "", sort: "",publisher:"" });
//     setView("quickView")
//     setSearchValues({search:""})
//   };

//   const handleSubmit = async (e) => {
//     if (e) {
//       e.preventDefault();
//     }
//     let params;
//     if (searchClean == false) {
//       setAlert({ ...alert, loading: true, message: "Loading..." });
//     }

//     params = {
//       limit,
//       page,
//     };

//     if (filterValues?.brand) {
//       params.brandName = filterValues.brand;
//     }
//     if (filterValues?.category) {
//       params.category = filterValues.category;
//     }
//     if (filterValues?.price) {
//       params.price = filterValues.price;
//     }
//     if (filterValues?.sort) {
//       params.sort = filterValues.sort;
//     }
//     if (filterValues?.publisher) {
//       params.publisher = filterValues.publisher;
//     }
//     let token = getCookie("token_user");

//     await allArticles(params)
//       .then((data) => {
//         // console.log(data);
//         if (data.status && data.status == "success") {
//           if (data.results == 0) {
//             setAllData(data.doc);
//             // if (searchClean == false) {
//             //   setAlert({
//             //     ...alert,
//             //     loading: false,
//             //     message: data.message,
//             //     error: false,
//             //     success: true,
//             //   });
//             // }

//             // window.setTimeout(() => {
//             //   resetAlert();
//             // }, 1000);
//           } else {
//             setAllData(data.doc);
//             // console.log(data.totalCount);
//             let totalCount = data.totalCount;
//             setTotalPages(Math.ceil(totalCount / limit));
//             setShow(false);
//           }
//           if (searchClean == false) {
//             // setAlert({
//             //   ...alert,
//             //   loading: false,
//             //   message: data.message,
//             //   error: false,
//             //   success: true,
//             // });
//           }

//           window.setTimeout(() => {
//             resetAlert();
//           }, 1000);
//         }

//         // return { data };
//       })
//       .catch((err) => {
//         console.log(err);

//         setAlert({
//           ...alert,
//           loading: false,
//           message: err.message,
//           error: true,
//           success: false,
//         });
//       });
//   };
//   // console.log(allData, "is there data...");

//   return (
//     <SideBar>
//     <main className="overflow-hidden">
//       {/* <Hero /> */}

//       {alert && alert?.message && <Modal alert={alert} setAlert={resetAlert} />}
   
//     </main>
//     </SideBar>
//   );
// }





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
    userId: ""

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
    let userId;
    if (localStorage.getItem("user")) {
      userId = JSON.parse(localStorage.getItem("user"))._id;
    }
    setParamsData({...paramsData,userId:userId})

    try {
      const response = await getProfile(userId, token);
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
