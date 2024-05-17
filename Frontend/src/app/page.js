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
//     <div>

//     </div>
//     </main>
//     </SideBar>
//   );
// }

"use client"

import React, { useState, useEffect } from "react";
import { getUserCount } from "@/actions/user";// Import the function getUserCount from your utilities file
import SideBar from "@/components/SideBar";

const Dashboard = () => {
  // State to store the user count data
  const [userCountData, setUserCountData] = useState({
    status: "",
    message: "",
    totalCount: 0,
  });

  useEffect(() => {
    // Function to fetch user count data
    const fetchUserCount = async () => {
      try {
        // Call the getUserCount function and store the returned data
        const userData = await getUserCount();

        // Update the state with the user count data
        setUserCountData({
          status: userData.status,
          message: userData.message,
          totalCount: userData.totalCount,
        });
      } catch (error) {
        console.error("Error fetching user count:", error);
      }
    };

    // Call the fetchUserCount function when the component mounts
    fetchUserCount();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <SideBar>
    {/* <div className="dashboard">

      <div className="dashboard-card">
        <h2>Total User Count</h2>
        <p>Status: {userCountData.status}</p>
        <p>Message: {userCountData.message}</p>
        <p>Total Count: {userCountData.totalCount}</p>
      </div>
 
    </div> */}

<div className="flex flex-wrap gap-4 p-4 dashboard mt-10">
        {/* Dashboard card to display user count */}
        <div className="flex-1 p-6 bg-white border border-gray-200 rounded-lg shadow-md dashboard-card box">
          <h2 className="mb-2 text-xl font-bold">Total User Count</h2>
          {/* <p className="mb-1">Status: {userCountData.status}</p>
          <p className="mb-1">Message: {userCountData.message}</p> */}
          <p className="mb-1">Total Count: {userCountData.totalCount}</p>
        </div>

        {/* Dashboard card to display total payment */}
        <div className="flex-1 p-6 bg-white border border-gray-200 rounded-lg shadow-md dashboard-card box">
          <h2 className="mb-2 text-xl font-bold">Total Payments</h2>
          {/* <p className="mb-1">Status: Active</p> */}
          {/* <p className="mb-1">Message: {totalPaymentData.message}</p> */}
          <p className="mb-1">Total Payment: 100</p>
        </div>

        {/* Other dashboard components */}
      </div>
    </SideBar>
  );
};

export default Dashboard;
