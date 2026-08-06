import { useCallback, useEffect, useState } from "react";
import { DoorOpen, X, ChevronLeft, ChevronRight, Images } from "lucide-react";
import { FLOOR_PLAN_IMAGES } from "../lib/floorPlanImages";
import "./FloorPlans.css";

const UNITS = [
  { id: "unit-103", rooms: "2 BHK", unit: "F103", area: "1005 sq ft" },
  { id: "unit-104", rooms: "2 BHK", unit: "F104", area: "1012 sq ft" },
  { id: "unit-106", rooms: "2 BHK", unit: "F106", area: "1190 sq ft" },
  { id: "unit-105", rooms: "3 BHK", unit: "F105", area: "1405 sq ft" },
  { id: "unit-101", rooms: "3 BHK", unit: "F101", area: "1485 sq ft" },
  { id: "unit-102", rooms: "3 BHK", unit: "F102", area: "1525 sq ft" },
];

function UnitGallery({ unit, onClose }) {
  const images = FLOOR_PLAN_IMAGES[unit.id] || [];
  const [index, setIndex] = useState(0);

  const prev = useCallback(() => setIndex((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  return (
    <div className="floor-gallery-overlay" onClick={onClose}>
      <div className="floor-gallery-modal" onClick={(e) => e.stopPropagation()}>
        <div className="floor-gallery-head">
          <strong>{unit.rooms} · {unit.unit}</strong>
          <span>{unit.area}</span>
          <button className="floor-gallery-close" onClick={onClose} aria-label="Close gallery"><X size={22} /></button>
        </div>
        <div className="floor-gallery-main">
          <img src={images[index]} alt={`${unit.rooms} ${unit.unit} ${index + 1}`} />
          {images.length > 1 && (
            <>
              <button className="floor-gallery-arrow floor-gallery-arrow-left" onClick={prev} aria-label="Previous image"><ChevronLeft size={26} /></button>
              <button className="floor-gallery-arrow floor-gallery-arrow-right" onClick={next} aria-label="Next image"><ChevronRight size={26} /></button>
            </>
          )}
          <div className="floor-gallery-counter">{index + 1} / {images.length}</div>
        </div>
        {images.length > 1 && (
          <div className="floor-gallery-thumbs">
            {images.map((img, i) => (
              <button key={img} className={`floor-gallery-thumb ${i === index ? "active" : ""}`} onClick={() => setIndex(i)}>
                <img src={img} alt={`${unit.rooms} ${unit.unit} ${i + 1}`} />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function FloorPlans() {
  const [openUnit, setOpenUnit] = useState(null);

  return (
    <div className="details-section">
      <h3>Floor Plans</h3>
      <div className="floor-plans-grid">
        {UNITS.map((unit) => (
          <button type="button" className="floor-plan-card" key={unit.id} onClick={() => setOpenUnit(unit)}>
            <div className="floor-plan-icon"><DoorOpen size={30} strokeWidth={1.6} /></div>
            <strong>{unit.rooms}</strong>
            <small>{unit.unit} · {unit.area}</small>
            <span className="floor-plan-tag"><Images size={12} strokeWidth={2} /> View Gallery</span>
          </button>
        ))}
      </div>
      {openUnit && <UnitGallery unit={openUnit} onClose={() => setOpenUnit(null)} />}
    </div>
  );
}
