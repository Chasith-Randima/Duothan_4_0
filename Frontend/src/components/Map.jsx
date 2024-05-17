

// // -----------------------------------------------------------------------------
// import "mapbox-gl/dist/mapbox-gl.css";
// import { useState } from "react";
// import ReactMapGl, { Marker, NavigationControl, Popup } from "react-map-gl";
// // import {} from "react-icons/fa"

// const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
// console.log(token);

// const Mapp = ({ allData }) => {
//   let locationArray = [];
//   if (allData) {
//     allData.map((item, index) => {
//       let data = {
//         latitude: parseFloat(item.coordinates.split(",")[0]),
//         longitude: parseFloat(item.coordinates.split(",")[1]),
//         description: item.title
//           ? item.title
//           : item.name
//           ? item.name
//           : "Garbage Here",
//         flag: item.flag && item.flag != "none" ? item.flag : "green",
//       };
//       locationArray.push(data);
//     });
//   }

//   console.log(allData, locationArray);
//   const [newPlace, setNewPlace] = useState();
//   const [viewPort, setViewPort] = useState({
//     // lat: 28.6448,
//     // lng: 77.216,
//     latitude: 7.8731,
//     longitude: 80.7718,
//     zoom: 6.8,
//   });

//   const MarkerPopup = ({ item }) => {
//     console.log(
//       item

//       // JSON.parse(item),
//       // JSON.parse(item).coordinates
//     );
//     return (
//       <>
//         <Marker
//           latitude={item.latitude}
//           longitude={item.longitude}
//           color={`${item.flag}`}

//           // latitude={newPlace.lat}
//           // longitude={newPlace.long}
//           // offsetLeft={-3.5 * viewPort.zoom}
//           // offsetTop={-7 * viewPort.zoom}
//           // onViewportChange={(viewPort) => setViewPort(viewPort)}
//           // onDblClick={handleClick}
//         ></Marker>
//         <Popup
//           latitude={item.latitude}
//           longitude={item.longitude}
//           offset={30}
//           closeOnClick={false}
//         >
//           <h2
//             className={
//               item.flag != "none"
//                 ? ` text-${item.flag}-500  font-bold `
//                 : "text-red-400"
//             }
//           >
//             {item.description}
//           </h2>
//         </Popup>
//       </>
//     );
//   };
//   const handleClick = (e) => {
//     const [longitude, latitude] = e.lngLat;
//     setNewPlace({
//       lat: latitude,
//       long: longitude,
//     });
//   };
//   return (
//     <ReactMapGl
//       initialViewState={viewPort}
//       mapboxAccessToken={token}
//       style={{ width: "100%", height: 600 }}
//       mapStyle="mapbox://styles/mapbox/streets-v11"
//       transitionDuration="200"
//     >
//       {locationArray &&
//         locationArray.map((item) => <MarkerPopup item={item} />)}

//       <NavigationControl position="bottom-right" />
//       {/* )} */}
//     </ReactMapGl>
//     // </div>
//   );
// };

// export default Mapp;
