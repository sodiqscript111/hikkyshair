"use client";

import React from "react";
import WorldMap from "./ui/world-map";

const DeliveryBanner: React.FC = () => {
  return (
    <section className="w-full py-20 bg-white text-center px-6 md:px-12 lg:px-20">
      <div className="max-w-5xl mx-auto mb-12">
        <h2 className="text-4xl md:text-5xl font-serif font-semibold text-black mb-4">
          We Deliver Worldwide
        </h2>
        <p className="text-gray-700 text-base md:text-lg leading-relaxed">
          Distance is never a barrier to beauty. Wherever you are, we’ll get our luxury collections to you. Because you deserve the best — no matter the coordinates.
        </p>
      </div>

      <div className="mt-10">
        <WorldMap
          lineColor="#000"
          dots={[
            { start: { lat: 6.5244, lng: 3.3792 }, end: { lat: 51.5074, lng: -0.1278 } }, // Lagos → London
            { start: { lat: 40.7128, lng: -74.0060 }, end: { lat: 35.6895, lng: 139.6917 } }, // NY → Tokyo
            { start: { lat: 48.8566, lng: 2.3522 }, end: { lat: -33.8688, lng: 151.2093 } }, // Paris → Sydney
            { start: { lat: 19.0760, lng: 72.8777 }, end: { lat: 1.3521, lng: 103.8198 } }, // Mumbai → Singapore
            { start: { lat: 34.0522, lng: -118.2437 }, end: { lat: 19.4326, lng: -99.1332 } }, // LA → Mexico
          ]}
        />
      </div>
    </section>
  );
};

export default DeliveryBanner;
