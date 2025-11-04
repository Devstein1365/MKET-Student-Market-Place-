import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { FaTimes, FaCheck, FaSearchPlus, FaSearchMinus } from "react-icons/fa";
import Button from "./Button";

const ImageCropper = ({ image, onComplete, onCancel }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const createCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels);
      onComplete(croppedImage);
    } catch (error) {
      console.error("Error cropping image:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col">
      {/* Header */}
      <div className="bg-[#111827] text-white p-4 flex items-center justify-between">
        <button
          onClick={onCancel}
          className="p-2 hover:bg-gray-700 rounded-full transition-colors"
        >
          <FaTimes size={20} />
        </button>
        <h3 className="text-lg font-inter font-semibold">Adjust Photo</h3>
        <button
          onClick={createCroppedImage}
          className="p-2 hover:bg-gray-700 rounded-full transition-colors"
        >
          <FaCheck size={20} className="text-[#14B8A6]" />
        </button>
      </div>

      {/* Cropper Area */}
      <div className="flex-1 relative">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={1}
          cropShape="round"
          showGrid={false}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>

      {/* Zoom Controls */}
      <div className="bg-[#111827] text-white p-6">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-4">
            <FaSearchMinus className="text-gray-400" size={20} />
            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <FaSearchPlus className="text-gray-400" size={20} />
          </div>
          <p className="text-center text-sm text-gray-400 mt-4 font-instrument">
            Pinch to zoom • Drag to reposition
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6 max-w-md mx-auto">
          <Button
            fullWidth
            variant="outline"
            onClick={onCancel}
            className="border-gray-600 text-white hover:bg-gray-700"
          >
            Cancel
          </Button>
          <Button
            fullWidth
            onClick={createCroppedImage}
            className="bg-[#14B8A6] hover:bg-[#0D9488]"
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};

// Helper function to create cropped image
const getCroppedImg = (imageSrc, pixelCrop) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }

      // Set canvas size to match the crop size
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;

      // Draw the cropped image
      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );

      // Convert canvas to base64
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Failed to create blob"));
          return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          resolve(reader.result);
        };
      }, "image/jpeg");
    };
    image.onerror = () => {
      reject(new Error("Failed to load image"));
    };
  });
};

export default ImageCropper;
