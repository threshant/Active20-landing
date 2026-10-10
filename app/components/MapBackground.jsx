"use client";

import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";

// EMS Xperience, Indiranagar, Bangalore
const CENTER = { lat: 12.9784, lng: 77.6408 };

const PAGE_BG = "#ffffff";

const LIGHT_STYLES = [
  { elementType: "geometry", stylers: [{ color: "#f3f6f7" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#5c6b76" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#ffffff" }] },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#e4f0e6" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#d5dee4" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#e7eef2" }],
  },
  {
    featureType: "road",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "transit",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#d5eef3" }],
  },
];

const MAP_OPTIONS = {
  disableDefaultUI: true,
  gestureHandling: "none",
  keyboardShortcuts: false,
  clickableIcons: false,
  backgroundColor: PAGE_BG,
  styles: LIGHT_STYLES,
};

export default function MapBackground() {
  const { isLoaded } = useJsApiLoader({
    id: "active20-dark-map",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
  });

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 bg-white"
      aria-hidden="true"
    >
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={CENTER}
          zoom={14}
          options={MAP_OPTIONS}
        >
          <MarkerF position={CENTER} />
        </GoogleMap>
      ) : null}

      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0.55)_28%,rgba(255,255,255,0.84)_58%,#ffffff_100%)]" />
    </div>
  );
}
