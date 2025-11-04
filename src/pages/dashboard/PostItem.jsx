import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaImage,
  FaTimes,
  FaCloudUploadAlt,
  FaMapMarkerAlt,
  FaTag,
  FaBox,
  FaDollarSign,
} from "react-icons/fa";
import Button from "../../components/shared/Button";
import Input from "../../components/shared/Input";
import { categories as categoriesData } from "../../services/productsService";

const PostItem = () => {
  const [images, setImages] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "",
    condition: "Used",
    location: "",
  });
  const [errors, setErrors] = useState({});

  // Handle image upload
  const handleImageUpload = (files) => {
    const fileArray = Array.from(files);
    const remainingSlots = 6 - images.length;

    if (remainingSlots <= 0) {
      alert("Maximum 6 images allowed!");
      return;
    }

    const newImages = fileArray.slice(0, remainingSlots).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages([...images, ...newImages]);
  };

  // Handle drag and drop
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files);
    }
  };

  // Remove image
  const removeImage = (id) => {
    setImages(images.filter((img) => img.id !== id));
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Product title is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = "Valid price is required";
    }
    if (!formData.category) {
      newErrors.category = "Please select a category";
    }
    if (!formData.location) {
      newErrors.location = "Location is required";
    }
    if (images.length === 0) {
      newErrors.images = "At least 1 image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // TODO: Handle form submission to backend
    console.log("Form Data:", formData);
    console.log("Images:", images);

    // Show success message
    alert("Product posted successfully! (Backend integration pending)");
  };

  const conditions = ["New", "Used", "Fairly Used"];
  const locations = [
    "Bosso Campus",
    "Gidan Kwano",
    "Main Campus",
    "Tunga",
    "Minna Town",
    "Other",
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-inter font-bold text-[#111827] mb-2">
          Post New Item
        </h1>
        <p className="text-[#4B5563] font-instrument">
          Fill in the details below to list your item for sale
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Upload Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <FaImage className="text-[#7E22CE] text-xl" />
            <h2 className="text-lg font-inter font-semibold text-[#111827]">
              Product Images
            </h2>
            <span className="text-sm text-[#4B5563] font-instrument">
              ({images.length}/6)
            </span>
          </div>

          {/* Upload Area */}
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all ${
              dragActive
                ? "border-[#7E22CE] bg-[#7E22CE]/5"
                : "border-gray-300 hover:border-[#7E22CE]"
            } ${
              images.length >= 6
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => {
              if (images.length < 6) {
                document.getElementById("file-input").click();
              }
            }}
          >
            <input
              id="file-input"
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleImageUpload(e.target.files)}
              className="hidden"
              disabled={images.length >= 6}
            />

            <FaCloudUploadAlt className="text-5xl text-[#7E22CE] mx-auto mb-4" />
            <h3 className="text-lg font-inter font-semibold text-[#111827] mb-2">
              {images.length >= 6
                ? "Maximum images reached"
                : "Drop images here or click to upload"}
            </h3>
            <p className="text-sm text-[#4B5563] font-instrument">
              Minimum 1 image, Maximum 6 images (JPG, PNG, WEBP)
            </p>
          </div>

          {errors.images && (
            <p className="text-red-500 text-sm mt-2 font-instrument">
              {errors.images}
            </p>
          )}

          {/* Image Preview Grid */}
          {images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
              <AnimatePresence>
                {images.map((image, index) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200 group"
                  >
                    <img
                      src={image.preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {index === 0 && (
                      <div className="absolute top-2 left-2 bg-[#7E22CE] text-white text-xs font-inter font-semibold px-2 py-1 rounded">
                        Main
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage(image.id);
                      }}
                      className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FaTimes />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <FaBox className="text-[#7E22CE] text-xl" />
            <h2 className="text-lg font-inter font-semibold text-[#111827]">
              Product Details
            </h2>
          </div>

          {/* Title */}
          <Input
            label="Product Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="e.g., iPhone 13 Pro Max 256GB"
            error={errors.title}
            required
          />

          {/* Description */}
          <div>
            <label className="block text-sm font-inter font-medium text-[#111827] mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your product in detail..."
              rows={4}
              className={`w-full px-4 py-3 border rounded-lg font-instrument text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#7E22CE] focus:border-transparent transition-all ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1 font-instrument">
                {errors.description}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-inter font-medium text-[#111827] mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg font-instrument text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#7E22CE] focus:border-transparent transition-all ${
                errors.category ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select a category</option>
              {categoriesData
                .filter((cat) => cat.id !== "all")
                .map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </option>
                ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1 font-instrument">
                {errors.category}
              </p>
            )}
          </div>

          {/* Condition */}
          <div>
            <label className="block text-sm font-inter font-medium text-[#111827] mb-2">
              Condition <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-3">
              {conditions.map((condition) => (
                <button
                  key={condition}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, condition }))
                  }
                  className={`flex-1 py-3 rounded-lg font-inter font-medium transition-all ${
                    formData.condition === condition
                      ? "bg-[#7E22CE] text-white"
                      : "bg-gray-100 text-[#4B5563] hover:bg-gray-200"
                  }`}
                >
                  {condition}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <FaDollarSign className="text-[#7E22CE] text-xl" />
            <h2 className="text-lg font-inter font-semibold text-[#111827]">
              Pricing
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Selling Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="0"
              leftIcon={<span className="text-[#4B5563]">₦</span>}
              error={errors.price}
              required
            />

            <Input
              label="Original Price (Optional)"
              name="originalPrice"
              type="number"
              value={formData.originalPrice}
              onChange={handleInputChange}
              placeholder="0"
              leftIcon={<span className="text-[#4B5563]">₦</span>}
              helperText="Show discount if item was more expensive"
            />
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <FaMapMarkerAlt className="text-[#7E22CE] text-xl" />
            <h2 className="text-lg font-inter font-semibold text-[#111827]">
              Location
            </h2>
          </div>

          <div>
            <label className="block text-sm font-inter font-medium text-[#111827] mb-2">
              Where is this item located?{" "}
              <span className="text-red-500">*</span>
            </label>
            <select
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg font-instrument text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#7E22CE] focus:border-transparent transition-all ${
                errors.location ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select location</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
            {errors.location && (
              <p className="text-red-500 text-sm mt-1 font-instrument">
                {errors.location}
              </p>
            )}
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="flex-1"
            onClick={() => window.history.back()}
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="lg" className="flex-1">
            Post Item
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostItem;
