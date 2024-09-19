import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Define default location coordinates
const defaultPosition = [-1.28333, 36.81667]; // Latitude and Longitude

function MapComponent({ markers }) {
  const [position, setPosition] = useState(defaultPosition);

  const handleMapClick = (event) => {
    const { lat, lng } = event.latlng;
    setPosition([lat, lng]);
  };

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: '100vh', width: '100%' }}
      onClick={handleMapClick}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {markers.map((marker, index) => (
        <Marker 
          key={index} 
          position={[marker.lat, marker.lng]} 
          icon={L.icon({
            iconUrl: 'https://unpkg.com/leaflet/dist/images/marker-icon.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowUrl: 'https://unpkg.com/leaflet/dist/images/marker-shadow.png',
            shadowSize: [41, 41]
          })}
        >
          <Popup>
            {marker.popupContent ? marker.popupContent : `Marker at ${marker.lat.toFixed(4)}, ${marker.lng.toFixed(4)}`}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapComponent;
