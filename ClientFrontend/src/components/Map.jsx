

import React, { useState, useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { allpunches, onePunch } from '@/actions/punch';

const Map = ({userId}) => {
  const [map, setMap] = useState(null);
  const [infoWindow, setInfoWindow] = useState(null);
  const [punchData,setPunchData] = useState()
  const [alert, setAlert] = useState({
    message: "",
    error: false,
    loading: false,
    success: false,
  });

  useEffect(() => {
    setAlert({ ...alert, loading: true });
    fetchLocation()
  }, []);

  const fetchLocation = async ()=>{
    try {
        let paramsData;
        paramsData = {
            userId:userId
        }
        const response = await allpunches(paramsData);
        if (response.status === "success") {
        //   setUserData(response.doc);
        console.log(response)
        setPunchData(response.doc)
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
  }

  function convertLocations(arr) {
    return arr.map(item => {
      const { location, userId, punchTime } = item;
      console.log(location,"mappppppppppppppppppp")
      let lat = location.coordinates[0]
      let lng = location.coordinates[1]
    //   const [lng, lat] = coordinates;
      return {
        lat,
        lng,
        userId,
        punchTime
      };
    });
  }
  

  useEffect(() => {
    const loader = new Loader({
      apiKey: 'AIzaSyBDs-1qXDH-ZUtTsEEJxZldmMd94r2kpog',
      version: 'weekly',
    });

    loader.load().then(() => {
      const mapOptions = {
        center: { lat: 6.8301, lng: 79.8801 }, // Center the map on one of the provided locations
        zoom: 10, // Adjust zoom level as needed
      };
      const map = new window.google.maps.Map(document.getElementById('map'), mapOptions);
      setMap(map);

      // Initialize info window
      const infoWindow = new window.google.maps.InfoWindow();
      setInfoWindow(infoWindow);

      // Define coordinates for the provided locations
    //   const locations =  punchData &&  convertLocations(punchData);
      const locations = [
        { lat: 6.8511, lng: 79.9212, userId: '60f7f9c8f9a31b2a2c1d8c5e', punchTime: '2024-05-17T12:34:56Z' },
        { lat: 6.8301, lng: 79.8801, userId: '60f7f9c8f9a31b2a2c1d8c5e', punchTime: '2024-05-17T12:34:56Z' },
        { lat: 6.4346, lng: 80.0004, userId: '60f7f9c8f9a31b2a2c1d8c5e', punchTime: '2024-05-17T12:34:56Z' },
        { lat: 6.8433, lng: 80.0032, userId: '60f7f9c8f9a31b2a2c1d8c5e', punchTime: '2024-05-17T12:34:56Z' },
      ];

    if(punchData && locations.length > 0){  // Loop through the locations and create markers for each
    console.log("markers are runnign")
      locations.forEach((location, index) => {
      console.log(location,"markers inside the for each");
        const marker = new window.google.maps.Marker({
          position: location,
          map: map,
          title: `Location ${index + 1}`,
        });

        // Add event listener for marker hover
        marker.addListener('mouseover', () => {
          infoWindow.setContent(`User ID: ${location.userId}<br>Punch Time: ${location.punchTime}`);
          infoWindow.open(map, marker);
        });

        // Close info window on mouseout
        marker.addListener('mouseout', () => {
          infoWindow.close();
        });
      });}
    });
    



    // Clean up the map instance
    // const showData = ()=>{
    return () => {
      if (map) {
        map.unbindAll();
        window.google.maps.event.clearInstanceListeners(map);
      }
    };
    // }

    //     {punchData && showData()}
    
    
  }, [punchData]);

  return (
    <div>
      {/* <h1>Transport Tracking</h1> */}
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
    </div>
  );
};

export default Map;

