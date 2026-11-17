import React, { useEffect, useRef } from "react";
import L from "leaflet";
import { findNearestWard, suggestRoadOwner } from "../services/dataService";
import { SEED_DATA } from "../data/seedData";

export default function LocationPickerMap({
  lat = 19.288,
  lng = 72.858,
  onLocationChange,
  height = "320px"
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const pinMarkerRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const initialLat = lat || 19.288;
      const initialLng = lng || 72.858;

      const map = L.map(mapContainerRef.current, {
        center: [initialLat, initialLng],
        zoom: 14,
        scrollWheelZoom: true
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(map);

      // Pin icon
      const pinIcon = L.divIcon({
        className: "picker-pin",
        html: `
          <div style="
            position: relative;
            width: 38px;
            height: 38px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: grab;
          ">
            <div style="
              position: absolute;
              width: 32px;
              height: 32px;
              background: #FFC400;
              border: 3px solid #17181C;
              border-radius: 50% 50% 50% 0;
              transform: rotate(-45deg);
              box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            "></div>
            <div style="
              position: relative;
              z-index: 2;
              width: 12px;
              height: 12px;
              background: #17181C;
              border-radius: 50%;
              margin-top: -6px;
            "></div>
          </div>
        `,
        iconSize: [38, 38],
        iconAnchor: [19, 38]
      });

      // Draggable marker
      const marker = L.marker([initialLat, initialLng], {
        icon: pinIcon,
        draggable: true
      }).addTo(map);

      pinMarkerRef.current = marker;

      // Handle Map Click
      map.on("click", (e) => {
        const { lat: newLat, lng: newLng } = e.latlng;
        marker.setLatLng([newLat, newLng]);
        notify(newLat, newLng);
      });

      // Handle Marker Drag
      marker.on("dragend", (e) => {
        const { lat: newLat, lng: newLng } = e.target.getLatLng();
        notify(newLat, newLng);
      });

      mapInstanceRef.current = map;
    }

    const timer = setTimeout(() => {
      mapInstanceRef.current?.invalidateSize();
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  // Update marker position if external lat/lng changes
  useEffect(() => {
    if (mapInstanceRef.current && pinMarkerRef.current && lat && lng) {
      const current = pinMarkerRef.current.getLatLng();
      if (Math.abs(current.lat - lat) > 0.0001 || Math.abs(current.lng - lng) > 0.0001) {
        pinMarkerRef.current.setLatLng([lat, lng]);
        mapInstanceRef.current.panTo([lat, lng]);
      }
    }
  }, [lat, lng]);

  const notify = (newLat, newLng) => {
    const wardId = findNearestWard(newLat, newLng);
    const wardObj = SEED_DATA.wards.find((w) => w.id === wardId);
    onLocationChange({
      lat: Number(newLat.toFixed(5)),
      lng: Number(newLng.toFixed(5)),
      wardId,
      wardName: wardObj?.name || "",
      wardArea: wardObj?.area || ""
    });
  };

  const handleQuickLoc = (quickLat, quickLng) => {
    if (mapInstanceRef.current && pinMarkerRef.current) {
      pinMarkerRef.current.setLatLng([quickLat, quickLng]);
      mapInstanceRef.current.setView([quickLat, quickLng], 15, { animate: true });
      notify(quickLat, quickLng);
    }
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <div style={{
        position: "relative",
        width: "100%",
        height,
        borderRadius: "14px",
        overflow: "hidden",
        border: "2px solid var(--y)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
      }}>
        <div ref={mapContainerRef} style={{ width: "100%", height: "100%", zIndex: 1 }} />
        <div style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: 500,
          background: "rgba(23, 24, 28, 0.88)",
          color: "#fff",
          padding: "6px 12px",
          borderRadius: "8px",
          fontSize: "12px",
          fontWeight: 600,
          backdropFilter: "blur(4px)"
        }}>
          📍 Tap map or drag pin to mark road damage
        </div>
      </div>

      {/* Quick Location Shortcuts */}
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "8px" }}>
        <span style={{ fontSize: "12px", color: "var(--mu)", alignSelf: "center", fontWeight: 600 }}>Quick Pan:</span>
        <button
          type="button"
          onClick={() => handleQuickLoc(19.307, 72.8495)}
          className="btn o"
          style={{ padding: "3px 10px", minHeight: "32px", fontSize: "12px", borderRadius: "8px" }}
        >
          Bhayandar Station (W)
        </button>
        <button
          type="button"
          onClick={() => handleQuickLoc(19.2825, 72.8665)}
          className="btn o"
          style={{ padding: "3px 10px", minHeight: "32px", fontSize: "12px", borderRadius: "8px" }}
        >
          Mira Road (Metro Line 9)
        </button>
        <button
          type="button"
          onClick={() => handleQuickLoc(19.2655, 72.883)}
          className="btn o"
          style={{ padding: "3px 10px", minHeight: "32px", fontSize: "12px", borderRadius: "8px" }}
        >
          Kashimira (Ghodbunder)
        </button>
      </div>
    </div>
  );
}
