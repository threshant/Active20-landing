"use client";

import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";

// EMS Xperience, Indiranagar, Bangalore
const CENTER = { lat: 12.9784, lng: 77.6408 };

const PAGE_BG = "#01111e";

const DARK_STYLES = [
  { elementType: "geometry", stylers: [{ color: PAGE_BG }] },
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#6f7c86" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: PAGE_BG }] },
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
    stylers: [{ color: "#0a1c2c" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#122536" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: PAGE_BG }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#1a3348" }],
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
    stylers: [{ color: PAGE_BG }],
  },
];

const MAP_OPTIONS = {
  disableDefaultUI: true,
  gestureHandling: "none",
  keyboardShortcuts: false,
  clickableIcons: false,
  backgroundColor: PAGE_BG,
  styles: DARK_STYLES,
};

export default function MapBackground() {
  const { isLoaded } = useJsApiLoader({
    id: "active20-dark-map",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
  });

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 bg-[#01111e]"
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

      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(1,17,30,0)_0%,rgba(1,17,30,0.38)_18%,rgba(1,17,30,0.7)_40%,rgba(1,17,30,0.92)_65%,#01111e_100%)]" />
    </div>
  );
}
