// import { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import io from "socket.io-client";

// // backend server ka URL
// const socket = io("http://localhost:5000");

// // 🔥 helper component (auto center update)
// function ChangeView({ center }) {
//   const map = useMap();
//   map.setView(center);
//   return null;
// }

// function MapComponent() {
//   const [position, setPosition] = useState([23.4085, 87.5310]);

//   useEffect(() => {
//     socket.on("update-location", (data) => {
//       console.log("Received:", data);
//       setPosition([data.lat, data.lon]);
//     });

//     return () => {
//       socket.off("update-location");
//     };
//   }, []);

//   return (
//     <MapContainer
//       center={position}
//       zoom={18}              // 🔥 default zoom high rakha
//       maxZoom={19}           // 🔥 REAL usable max zoom
//       minZoom={3}
//       scrollWheelZoom={true}
//       style={{ height: "100vh", width: "100%" }}
//     >
//       {/* auto center update */}
//       <ChangeView center={position} />

//       {/* OpenStreetMap tiles with max zoom */}
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         maxZoom={19}         // 🔥 important
//       />

//       <Marker position={position}>
//         <Popup>📍 Live GPS Location</Popup>
//       </Marker>
//     </MapContainer>
//   );
// }

// export default MapComponent;






import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

// 🔥 Smooth + safe ChangeView
function ChangeView({ center, follow }) {
  const map = useMap();
  const lastPos = useRef(L.latLng(center[0], center[1]));

  useEffect(() => {
    if (!follow) return;

    const newPos = L.latLng(center[0], center[1]);
    const current = map.getCenter();

    const distance = map.distance(current, newPos);

    // 🔥 ignore noise (< 3m)
    if (distance < 3) return;

    // 🔥 smooth interpolation
    const smoothLat =
      lastPos.current.lat + (newPos.lat - lastPos.current.lat) * 0.2;

    const smoothLng =
      lastPos.current.lng + (newPos.lng - lastPos.current.lng) * 0.2;

    const smoothPos = L.latLng(smoothLat, smoothLng);

    map.panTo(smoothPos, {
      animate: true,
      duration: 0.5
    });

    lastPos.current = smoothPos;

  }, [center, follow, map]);

  return null;
}

function MapComponent() {
  const [position, setPosition] = useState([23.4085, 87.5310]);
  const [follow, setFollow] = useState(true); // 🔥 toggle

  useEffect(() => {
    socket.on("update-location", (data) => {
      setPosition([data.lat, data.lon]);
    });

    return () => {
      socket.off("update-location");
    };
  }, []);

  return (
    <>
      {/* 🔥 Follow toggle button */}
      <button
        onClick={() => setFollow(!follow)}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 1000,
          padding: "10px"
        }}
      >
        {follow ? "🟢 Follow ON" : "🔴 Follow OFF"}
      </button>

      <MapContainer
        center={position}
        zoom={18}
        maxZoom={19}
        minZoom={3}
        scrollWheelZoom={true}
        style={{ height: "100vh", width: "100%" }}
      >
        {/* 🔥 controlled smooth movement */}
        <ChangeView center={position} follow={follow} />

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />

        <Marker position={position}>
          <Popup>📍 Live GPS Location</Popup>
        </Marker>
      </MapContainer>
    </>
  );
}

export default MapComponent;