// src/MapComponent.js
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Define default location coordinates
const defaultPosition = [-1.28333, 36.81667]; // Latitude and Longitude

function MapComponent() {
  const [positions, setPositions] = useState([defaultPosition]);

  const handleMapClick = (event) => {
    const { lat, lng } = event.latlng;
    setPositions([...positions, [lat, lng]]);
  };

  return (
    <MapContainer
      center={defaultPosition}
      zoom={13}
      style={{ height: '100vh', width: '100%' }}
      onClick={handleMapClick}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {positions.map((pos, index) => (
        <Marker
          key={index}
          position={pos}
          icon={L.icon({
            iconUrl: 'https://unpkg.com/leaflet/dist/images/marker-icon.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowUrl: 'https://unpkg.com/leaflet/dist/images/marker-shadow.png',
            shadowSize: [41, 41],
          })}
        >
          <Popup>
            Marker at {pos[0].toFixed(4)}, {pos[1].toFixed(4)}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapComponent;
