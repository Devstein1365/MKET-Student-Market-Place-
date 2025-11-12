import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

/**
 * ReviewForm
 * Props:
 * - targetUserId: id of the user being reviewed (optional, informative)
 * - authorId: id of the reviewer (optional)
 * - onSubmit: async function({ rating, text, authorId, targetUserId }) => Promise
 *
 * This component is backend-agnostic: pass an onSubmit prop that talks to your
 * data layer (localDb or server). If none is provided it will console.log the payload.
 */
const ReviewForm = ({
  targetUserId,
  authorId,
  onSubmit,
  initialRating = 0,
  initialText = "",
  initialProductTitle = null,
  products = [],
  submitLabel = "Submit Review",
  onCancel,
}) => {
  const [rating, setRating] = useState(initialRating);
  const [text, setText] = useState(initialText);
  const [selectedProduct, setSelectedProduct] = useState(
    initialProductTitle || (products[0] && products[0].title) || null
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleStar = (value) => setRating(value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (rating < 1) {
      setError("Please select a rating.");
      return;
    }
    if (text.trim().length < 5) {
      setError("Please enter at least 5 characters for your review.");
      return;
    }

    const payload = {
      rating,
      text: text.trim(),
      authorId,
      targetUserId,
      productTitle: selectedProduct,
    };
    setSubmitting(true);
    try {
      if (onSubmit) {
        await onSubmit(payload);
      } else {
        // fallback: log to console
        console.log("Review submit", payload);
      }
      setText("");
      setRating(0);
      // keep selected product if provided; don't clear so user can submit several reviews
    } catch (err) {
      setError(err.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-white">
      <div className="mb-2 font-semibold">Leave a review</div>
      <div className="flex items-center gap-2 mb-3">
        {[1, 2, 3, 4, 5].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => handleStar(s)}
            className={`text-xl ${
              s <= rating ? "text-yellow-500" : "text-gray-300"
            }`}
            aria-label={`Rate ${s} star${s > 1 ? "s" : ""}`}
          >
            <FaStar />
          </button>
        ))}
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        placeholder="Write a short review (what went well, any issues)"
        className="w-full border p-2 rounded mb-2"
      />

      {products && products.length > 0 && (
        <div className="mb-2">
          <label className="text-xs text-gray-600 mb-1 block">
            About product (optional)
          </label>
          <select
            value={selectedProduct || ""}
            onChange={(e) => setSelectedProduct(e.target.value || null)}
            className="w-full border p-2 rounded"
          >
            <option value="">General / Seller</option>
            {products.map((p) => (
              <option key={p.id} value={p.title}>
                {p.title}
              </option>
            ))}
          </select>
        </div>
      )}

      {error && <div className="text-sm text-red-600 mb-2">{error}</div>}

      <div className="flex justify-between">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border rounded text-gray-700 mr-2"
          >
            Cancel
          </button>
        )}
        <div className="ml-auto">
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 bg-linear-to-r from-[#7E22CE] to-[#14B8A6] text-white rounded disabled:opacity-50"
          >
            {submitting ? "Submitting..." : submitLabel}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ReviewForm;
