import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

/**
 * ReviewsList
 * Props:
 * - reviews: optional array of review objects
 * - fetchReviews: optional async function that returns reviews array
 *
 * Review shape: { id, authorId, rating, text, createdAt, authorName? }
 */
const Stars = ({ value }) => (
  <div className="flex items-center">
    {[1, 2, 3, 4, 5].map((s) => (
      <FaStar
        key={s}
        className={s <= value ? "text-yellow-500" : "text-gray-300"}
      />
    ))}
  </div>
);

const ReviewsList = ({ reviews: propReviews, fetchReviews }) => {
  const [reviews, setReviews] = useState(propReviews || []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (propReviews) return; // controlled by parent
    if (!fetchReviews) return;
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const r = await fetchReviews();
        if (mounted) setReviews(r || []);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, [propReviews, fetchReviews]);

  if (loading) return <div className="p-4">Loading reviews…</div>;
  if (!reviews || reviews.length === 0)
    return <div className="p-4 text-gray-600">No reviews yet.</div>;

  return (
    <div className="space-y-3">
      {reviews.map((r) => (
        <div key={r.id} className="p-3 border rounded bg-white">
          <div className="flex items-center justify-between">
            <div className="font-medium">
              {r.authorName || r.authorId || "Anonymous"}
            </div>
            <Stars value={r.rating || 0} />
          </div>
          <div className="text-sm text-gray-700 mt-2">{r.text}</div>
          <div className="text-xs text-gray-400 mt-1">
            {new Date(r.createdAt).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewsList;
