// src/components/MapComponent.jsx

import React, { useState, useEffect } from 'react';
import MapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import PropTypes from 'prop-types';

// Access the Mapbox token from environment variables
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const MapComponent = ({ latitude, longitude, zoom = 10, children, ...props }) => {
  const [viewport, setViewport] = useState({
    latitude: latitude || 37.8,
    longitude: longitude || -122.4,
    zoom: zoom,
    bearing: 0,
    pitch: 0,
  });

  useEffect(() => {
    if (latitude && longitude) {
      setViewport((prevViewport) => ({
        ...prevViewport,
        latitude,
        longitude,
      }));
    }
  }, [latitude, longitude]);

  return (
    <MapGL
      {...viewport}
      width="100%"
      height="100%"
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxApiAccessToken={MAPBOX_TOKEN}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      {...props}
    >
      {children}
    </MapGL>
  );
};

// Define prop types
MapComponent.propTypes = {
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  zoom: PropTypes.number,
  children: PropTypes.node,
};

export default MapComponent;




