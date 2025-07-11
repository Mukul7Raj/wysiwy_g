'use client';

import React from "react";
import { DroppableZoneRefMap } from "./DroppableZone";

const ResetButton: React.FC = () => {
  const handleReset = () => {
    DroppableZoneRefMap["top-zone"]?.clear?.();
    DroppableZoneRefMap["bottom-zone"]?.clear?.();
    DroppableZoneRefMap["shoes-zone"]?.clear?.();
    DroppableZoneRefMap["accessories-zone"]?.clear?.();
  };

  return (
    <button
      onClick={handleReset}
      style={{
        padding: "10px 16px",
        backgroundColor: "#e53e3e",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "15px",
        minHeight: "44px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      🔄 Reset
    </button>
  );
};

export default ResetButton;