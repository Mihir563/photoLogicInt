"use client";

import React from "react";

const CosmicLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="relative w-15 h-15">
        {/* Middle Ring */}
        <div className="absolute inset-2 rounded-full border-2 border-b-transparent border-black animate-spin" />
      </div>
    </div>
  );
};

export default CosmicLoader;
