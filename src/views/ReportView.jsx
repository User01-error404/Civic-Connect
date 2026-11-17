import React, { useState } from "react";
import LocationPickerMap from "../components/LocationPickerMap";
import { compressImage, suggestRoadOwner, findNearestWard } from "../services/dataService";
import { SEED_DATA } from "../data/seedData";

export default function ReportView({ onSubmitComplaint, setActiveView, t }) {
  const [step, setStep] = useState(1);
  const [photoBase64, setPhotoBase64] = useState(null);
  const [photoSizeKb, setPhotoSizeKb] = useState(null);

  const [lat, setLat] = useState(19.288);
  const [lng, setLng] = useState(72.858);
  const [wardId, setWardId] = useState("ward01");
  const [address, setAddress] = useState("");
  const [gpsStatus, setGpsStatus] = useState("");

  const [subcategory, setSubcategory] = useState("pothole");
  const [severity, setSeverity] = useState(2);
  const [description, setDescription] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [submittedTicket, setSubmittedTicket] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-calculated road owner
  const suggestedOwnerId = suggestRoadOwner(address, wardId, lat, lng);
  const roadOwnerObj = SEED_DATA.roadOwners.find((o) => o.id === suggestedOwnerId);

  // Handle Photo selection with canvas compression
  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setErrorMsg("");
      const compressed = await compressImage(file, 640, 0.65);
      setPhotoBase64(compressed);

      // Estimate compressed size in KB
      const approxKb = Math.round((compressed.length * 3) / 4 / 1024);
      setPhotoSizeKb(approxKb);
    } catch (err) {
      setErrorMsg("Failed to process image. Please try another photo.");
    }
  };

  // Handle GPS detection
  const handleDetectGps = () => {
    if (!navigator.geolocation) {
      setGpsStatus(t("gpsBad"));
      return;
    }

    setGpsStatus("Detecting satellite position...");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        setLat(latitude);
        setLng(longitude);
        const nearest = findNearestWard(latitude, longitude);
        setWardId(nearest);
        setGpsStatus(`${t("gpsOk")} (±${Math.round(accuracy)}m)`);
      },
      () => {
        setGpsStatus(t("gpsBad"));
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  // Handle Pin Drop on Map
  const handleMapLocationChange = ({ lat: newLat, lng: newLng, wardId: newWard }) => {
    setLat(newLat);
    setLng(newLng);
    setWardId(newWard);
    setGpsStatus(`Coordinates: ${newLat.toFixed(4)}, ${newLng.toFixed(4)}`);
  };

  // Step Validation & Progression
  const handleNext = () => {
    setErrorMsg("");

    if (step === 1) {
      if (!photoBase64) {
        setErrorMsg(t("ePhoto"));
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!wardId) {
        setErrorMsg(t("eLoc"));
        return;
      }
      if (!address.trim()) {
        setErrorMsg(t("eAddr"));
        return;
      }
      setStep(3);
    } else if (step === 3) {
      if (description.trim().length < 10) {
        setErrorMsg(t("eDesc"));
        return;
      }
      submitForm();
    }
  };

  const submitForm = async () => {
    setIsSubmitting(true);
    try {
      const newTicket = await onSubmitComplaint({
        subcategory,
        severity: Number(severity),
        description: description.trim(),
        location: {
          lat,
          lng,
          address: address.trim()
        },
        wardId,
        roadOwnerId: suggestedOwnerId,
        photoBase64
      });

      setSubmittedTicket(newTicket);
      setStep(4);
    } catch (err) {
      setErrorMsg("Failed to submit complaint. Please retry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setPhotoBase64(null);
    setPhotoSizeKb(null);
    setAddress("");
    setDescription("");
    setErrorMsg("");
    setSubmittedTicket(null);
  };

  return (
    <section className="v view-report">
      <h1 className="pt" tabIndex={-1}>
        {t("rTitle")}
      </h1>

      {/* Progress Steps Header */}
      {step < 4 && (
        <ol className="steps">
          <li className={step >= 1 ? "on" : ""} aria-current={step === 1 ? "step" : undefined}>
            1. {t("st1")}
          </li>
          <li className={step >= 2 ? "on" : ""} aria-current={step === 2 ? "step" : undefined}>
            2. {t("st2")}
          </li>
          <li className={step >= 3 ? "on" : ""} aria-current={step === 3 ? "step" : undefined}>
            3. {t("st3")}
          </li>
        </ol>
      )}

      <div className="box" style={{ padding: "24px" }}>
        {/* Step 1: Photo */}
        {step === 1 && (
          <div className="pn">
            <span className="fl">{t("photoL")}</span>
            <label className="drop">
              <svg className="ic" viewBox="0 0 24 24" aria-hidden="true" style={{ width: "36px", height: "36px" }}>
                <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
                <circle cx="12" cy="13" r="3.5" />
              </svg>
              <span style={{ fontWeight: 700, fontSize: "1.05rem" }}>{t("photoH")}</span>
              <span className="mu" style={{ fontSize: "0.85rem" }}>
                Photos are automatically compressed to ~40-60 KB using HTML5 Canvas
              </span>
              <input
                type="file"
                id="photo"
                accept="image/*"
                capture="environment"
                onChange={handlePhotoUpload}
              />
            </label>

            {photoBase64 && (
              <div style={{ marginTop: "16px" }}>
                <div
                  id="prev"
                  role="img"
                  aria-label="Damage Preview"
                  style={{
                    backgroundImage: `url('${photoBase64}')`,
                    height: "240px",
                    borderRadius: "14px",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    border: "2px solid var(--y)"
                  }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px" }}>
                  <span className="mu" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                    ✅ {t("photoCompressed")} ({photoSizeKb} KB)
                  </span>
                  <label htmlFor="photo" style={{ color: "var(--in)", cursor: "pointer", fontWeight: 700, fontSize: "0.85rem" }}>
                    Retake / Change
                  </label>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Location & Ward */}
        {step === 2 && (
          <div className="pn">
            <div className="row" style={{ alignItems: "center" }}>
              <span className="fl" style={{ margin: 0 }}>{t("locL")}</span>
              <button
                type="button"
                className="btn o"
                onClick={handleDetectGps}
                style={{ padding: "0 14px", minHeight: "38px", fontSize: "0.88rem" }}
              >
                🛰️ {t("gps")}
              </button>
            </div>

            {gpsStatus && (
              <p className="mu" style={{ margin: "6px 0", fontSize: "0.85rem", fontWeight: 600 }}>
                {gpsStatus}
              </p>
            )}

            {/* Interactive Pin-Drop Leaflet Map */}
            <LocationPickerMap
              lat={lat}
              lng={lng}
              onLocationChange={handleMapLocationChange}
              height="300px"
            />

            {/* MBMC Ward Committee Select */}
            <label className="f" htmlFor="ward" style={{ marginTop: "16px" }}>
              {t("wardSelect")} <span className="mu">{t("wardAuto")}</span>
            </label>
            <select
              id="ward"
              value={wardId}
              onChange={(e) => setWardId(e.target.value)}
            >
              {SEED_DATA.wards.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.name} ({w.area})
                </option>
              ))}
            </select>

            {/* Address Landmark */}
            <label className="f" htmlFor="addr">
              {t("addrL")}
            </label>
            <input
              type="text"
              id="addr"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={t("addrP")}
              autoComplete="off"
            />

            {/* Auto-detected Road Owner Agency Preview */}
            <div style={{
              marginTop: "16px",
              padding: "12px 14px",
              borderRadius: "12px",
              background: "var(--bg)",
              border: "1.5px solid var(--ln)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <div>
                <div className="mu" style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase" }}>
                  {t("roadOwnerL")} ({t("roadOwnerAuto")})
                </div>
                <div style={{ fontWeight: 800, fontSize: "1rem", color: "var(--in)", marginTop: "2px" }}>
                  {roadOwnerObj?.name}
                </div>
                <div className="mu" style={{ fontSize: "0.78rem" }}>
                  {roadOwnerObj?.note}
                </div>
              </div>
              <span className="tag" style={{ background: "var(--y)", color: "#17181C" }}>
                Auto-Routed
              </span>
            </div>
          </div>
        )}

        {/* Step 3: Details */}
        {step === 3 && (
          <div className="pn">
            <span className="fl">{t("subL")}</span>
            <div className="opts" style={{ marginBottom: "16px" }}>
              {SEED_DATA.categories.map((c) => (
                <label key={c.id} className="opt">
                  <input
                    type="radio"
                    name="sub"
                    value={c.id}
                    checked={subcategory === c.id}
                    onChange={(e) => setSubcategory(e.target.value)}
                  />
                  <span>{t("sub_" + c.id)}</span>
                </label>
              ))}
            </div>

            <span className="fl">{t("sevL")}</span>
            <div className="opts" style={{ marginBottom: "16px" }}>
              {[
                { val: 1, label: t("sev_1") },
                { val: 2, label: t("sev_2") },
                { val: 3, label: t("sev_3") }
              ].map((s) => (
                <label key={s.val} className="opt" style={{ flex: 1, minWidth: "220px" }}>
                  <input
                    type="radio"
                    name="sev"
                    value={s.val}
                    checked={Number(severity) === s.val}
                    onChange={(e) => setSeverity(Number(e.target.value))}
                  />
                  <span>{s.label}</span>
                </label>
              ))}
            </div>

            <label className="f" htmlFor="desc">
              {t("descL")}
            </label>
            <textarea
              id="desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t("descP")}
              maxLength={500}
            />
            <p className="mu" style={{ textAlign: "right", margin: "4px 0 0", fontSize: "0.85rem" }}>
              {description.length}/500
            </p>
          </div>
        )}

        {/* Step 4: Submission Confirmation */}
        {step === 4 && submittedTicket && (
          <div className="pn" style={{ textAlign: "center", padding: "20px 0" }}>
            <svg className="ic" viewBox="0 0 24 24" aria-hidden="true" style={{ width: "64px", height: "64px", color: "var(--ok)", margin: "0 auto 12px" }}>
              <path d="M5 12.5l4.5 4.5L19 7.5" strokeWidth="2.5" />
            </svg>
            <h2 style={{ fontSize: "1.6rem", margin: "0 0 6px" }}>
              {t("done")}
            </h2>
            <p className="mu" style={{ maxWidth: "45ch", margin: "0 auto 16px" }}>
              {t("doneNotice")}
            </p>
            <div style={{
              display: "inline-block",
              background: "var(--bg)",
              border: "2px dashed var(--y)",
              borderRadius: "14px",
              padding: "12px 24px",
              margin: "0 auto 24px"
            }}>
              <div className="mu" style={{ fontSize: "0.8rem", fontWeight: 700 }}>
                {t("doneT")}
              </div>
              <div className="tk" style={{ fontSize: "1.7rem", fontWeight: 800, marginTop: "4px" }}>
                {submittedTicket.ticketNo}
              </div>
            </div>

            <div className="btns" style={{ justifyContent: "center" }}>
              <button
                type="button"
                className="btn"
                onClick={() => setActiveView("track")}
              >
                🗺️ {t("trackBtn")}
              </button>
              <button
                type="button"
                className="btn o"
                onClick={handleReset}
              >
                ➕ {t("reportAnother")}
              </button>
            </div>
          </div>
        )}

        {/* Error message */}
        {errorMsg && (
          <p className="err" role="alert" style={{ margin: "14px 0 0" }}>
            {errorMsg}
          </p>
        )}

        {/* Navigation buttons */}
        {step < 4 && (
          <div className="nav2" style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
            {step > 1 && (
              <button
                type="button"
                className="btn o"
                onClick={() => setStep(step - 1)}
                style={{ borderColor: "var(--ink)" }}
              >
                {t("back")}
              </button>
            )}
            <button
              type="button"
              className="btn"
              onClick={handleNext}
              disabled={isSubmitting}
              style={{ marginLeft: step === 1 ? "auto" : undefined }}
            >
              {isSubmitting ? t("submitting") : step === 3 ? t("submit") : t("next")}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
