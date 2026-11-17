import React, { useEffect, useRef } from "react";
import L from "leaflet";
import { SEED_DATA } from "../data/seedData";

const STATUS_COLORS = {
  submitted: "#6B7280",
  acknowledged: "#2563EB",
  assigned: "#7C3AED",
  in_progress: "#D97706",
  resolved: "#16A34A"
};

const OWNER_BADGES = {
  mbmc: { label: "MBMC", color: "#1D4ED8" },
  mmrda: { label: "MMRDA", color: "#B45309" },
  pwd_state: { label: "State PWD", color: "#9333EA" },
  nhai: { label: "NHAI", color: "#DC2626" }
};

export default function MapView({
  complaints = [],
  selectedComplaint = null,
  onSelectComplaint = null,
  showWardCentroids = true,
  height = "480px"
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [19.288, 72.858],
        zoom: 13,
        scrollWheelZoom: true
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(map);

      markersLayerRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }

    // Leaflet container resize fix
    const timer = setTimeout(() => {
      mapInstanceRef.current?.invalidateSize();
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  // Update Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer) return;

    markersLayer.clearLayers();

    // 1. Plot Ward Centroids
    if (showWardCentroids) {
      SEED_DATA.wards.forEach((ward) => {
        const wardIcon = L.divIcon({
          className: "ward-marker-icon",
          html: `
            <div style="
              background: #17181C;
              color: #FFC400;
              border: 1.5px solid #FFC400;
              border-radius: 99px;
              padding: 2px 8px;
              font-size: 11px;
              font-weight: 700;
              font-family: inherit;
              box-shadow: 0 2px 6px rgba(0,0,0,0.3);
              white-space: nowrap;
              display: flex;
              align-items: center;
              gap: 4px;
            ">
              <span style="display:inline-block;width:6px;height:6px;background:#FFC400;border-radius:50%"></span>
              W${ward.no}
            </div>
          `,
          iconSize: [60, 24],
          iconAnchor: [30, 12]
        });

        const m = L.marker([ward.centroid.lat, ward.centroid.lng], { icon: wardIcon });
        m.bindPopup(`
          <div style="font-family: inherit; font-size: 13px; line-height: 1.4;">
            <strong style="color: #17181C;">${ward.name}</strong>
            <p style="margin: 4px 0; color: #5B5F66;">${ward.office}</p>
            <div style="font-size: 11px; color: #1D4ED8; font-weight: 600;">Area: ${ward.area}</div>
          </div>
        `);
        m.addTo(markersLayer);
      });
    }

    // 2. Plot Complaint Pins
    complaints.forEach((c) => {
      if (!c.location?.geo?.lat || !c.location?.geo?.lng) return;

      const color = STATUS_COLORS[c.status] || "#6B7280";
      const isSelected = selectedComplaint?.id === c.id;
      const owner = OWNER_BADGES[c.roadOwnerId] || { label: c.roadOwnerId?.toUpperCase() || "MBMC", color: "#1D4ED8" };

      const markerHtml = `
        <div class="custom-pin ${isSelected ? "selected-pin" : ""}" style="
          position: relative;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        ">
          <div style="
            position: absolute;
            width: 28px;
            height: 28px;
            background: ${color};
            border: 2.5px solid #FFFFFF;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            box-shadow: 0 4px 10px rgba(0,0,0,0.35);
          "></div>
          <div style="
            position: relative;
            z-index: 2;
            width: 10px;
            height: 10px;
            background: #FFFFFF;
            border-radius: 50%;
            margin-top: -4px;
          "></div>
          ${isSelected ? `<div class="pin-radar" style="position: absolute; inset: -8px; border: 2px solid ${color}; border-radius: 50%; animation: ping 1.5s infinite;"></div>` : ""}
        </div>
      `;

      const customIcon = L.divIcon({
        className: "custom-leaflet-pin",
        html: markerHtml,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -28]
      });

      const marker = L.marker([c.location.geo.lat, c.location.geo.lng], { icon: customIcon });

      // Popup content
      const popupHtml = `
        <div style="font-family: inherit; font-size: 13px; line-height: 1.45; min-width: 220px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <span style="font-family: monospace; font-weight: 700; color: #17181C; font-size: 12px;">${c.ticketNo}</span>
            <span style="background: ${color}20; color: ${color}; padding: 2px 8px; border-radius: 99px; font-weight: 700; font-size: 10px; text-transform: uppercase;">
              ${c.status.replace("_", " ")}
            </span>
          </div>
          <div style="font-weight: 700; color: #17181C; font-size: 14px; margin-bottom: 4px;">
            ${c.subcategory?.toUpperCase()} · ${c.location.address || "Road Damage"}
          </div>
          <p style="color: #5B5F66; font-size: 12px; margin: 0 0 8px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
            ${c.description}
          </p>
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #E5E7EB; padding-top: 6px;">
            <span style="font-size: 11px; font-weight: 700; color: ${owner.color}; background: ${owner.color}15; padding: 2px 6px; border-radius: 6px;">
              ${owner.label}
            </span>
            <button id="view-pop-${c.id}" style="
              background: #FFC400;
              border: 1px solid #17181C;
              color: #17181C;
              padding: 4px 10px;
              border-radius: 6px;
              font-size: 11px;
              font-weight: 700;
              cursor: pointer;
            ">
              View Details &rarr;
            </button>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml);

      marker.on("popupopen", () => {
        const btn = document.getElementById(`view-pop-${c.id}`);
        if (btn && onSelectComplaint) {
          btn.onclick = () => onSelectComplaint(c);
        }
      });

      marker.addTo(markersLayer);
    });

    // If a specific complaint is selected, pan map to it
    if (selectedComplaint?.location?.geo) {
      map.setView([selectedComplaint.location.geo.lat, selectedComplaint.location.geo.lng], 15, {
        animate: true
      });
    }
  }, [complaints, selectedComplaint, showWardCentroids, onSelectComplaint]);

  return (
    <div className="map-view-card" style={{ position: "relative", width: "100%", height, borderRadius: "16px", overflow: "hidden", border: "1.5px solid var(--ln)" }}>
      <div ref={mapContainerRef} style={{ width: "100%", height: "100%", zIndex: 1 }} />
      <div style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        zIndex: 500,
        background: "rgba(255, 255, 255, 0.92)",
        backdropFilter: "blur(6px)",
        padding: "6px 10px",
        borderRadius: "10px",
        border: "1px solid #DAD6CC",
        fontSize: "11px",
        fontWeight: 600,
        color: "#17181C",
        display: "flex",
        flexDirection: "column",
        gap: "4px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#6B7280" }}></span>
          <span>Submitted</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#2563EB" }}></span>
          <span>Acknowledged</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#D97706" }}></span>
          <span>In Progress</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#16A34A" }}></span>
          <span>Resolved</span>
        </div>
      </div>
    </div>
  );
}
