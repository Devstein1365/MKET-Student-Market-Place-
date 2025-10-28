import React from "react";

const FontTest = () => {
  return (
    <div className="p-8 space-y-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Font Test</h2>

        {/* Default - Instrument Sans */}
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-2">
            Default (Instrument Sans)
          </p>
          <h3 className="text-3xl font-bold">The Quick Brown Fox Jumps</h3>
          <p className="text-lg">
            Regular text with Instrument Sans 0123456789
          </p>
        </div>

        {/* Inter */}
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-2">Inter (font-inter)</p>
          <h3 className="font-inter text-3xl font-bold">
            The Quick Brown Fox Jumps
          </h3>
          <p className="font-inter text-lg">
            Regular text with Inter 0123456789
          </p>
        </div>

        {/* Zen Dots */}
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-2">Zen Dots (font-zen)</p>
          <h3 className="font-zen text-3xl">The Quick Brown Fox</h3>
          <p className="font-zen text-lg">MKET LOGO 0123456789</p>
        </div>
      </div>
    </div>
  );
};

export default FontTest;
