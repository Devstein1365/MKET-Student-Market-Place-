import React from "react";

const StatsCard = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="text-center p-3 bg-[#7E22CE]/5 rounded-lg">
        <p className="text-2xl font-inter font-bold text-[#7E22CE]">
          {stats.totalListings}
        </p>
        <p className="text-xs text-gray-600 font-instrument">Total Listings</p>
      </div>
      <div className="text-center p-3 bg-[#14B8A6]/5 rounded-lg">
        <p className="text-2xl font-inter font-bold text-[#14B8A6]">
          {stats.totalSold}
        </p>
        <p className="text-xs text-gray-600 font-instrument">Items Sold</p>
      </div>
      <div className="text-center p-3 bg-blue-50 rounded-lg">
        <p className="text-2xl font-inter font-bold text-blue-600">
          {stats.totalViews}
        </p>
        <p className="text-xs text-gray-600 font-instrument">Total Views</p>
      </div>
      <div className="text-center p-3 bg-orange-50 rounded-lg">
        <p className="text-2xl font-inter font-bold text-orange-600">
          {stats.activeListings}
        </p>
        <p className="text-xs text-gray-600 font-instrument">Active</p>
      </div>
    </div>
  );
};

export default StatsCard;
