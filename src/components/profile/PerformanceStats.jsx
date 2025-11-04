import React from "react";
import Card from "../shared/Card";

const PerformanceStats = ({ stats }) => {
  return (
    <div className="space-y-6">
      {/* Detailed Stats */}
      <Card>
        <h3 className="font-inter font-semibold text-gray-900 mb-4">
          Performance Overview
        </h3>
        <div className="space-y-4">
          {/* Total Views */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-instrument text-gray-600">
                Total Profile Views
              </span>
              <span className="text-sm font-inter font-bold text-gray-900">
                {stats.totalViews}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-[#7E22CE] h-2 rounded-full"
                style={{ width: "75%" }}
              ></div>
            </div>
          </div>

          {/* Response Rate */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-instrument text-gray-600">
                Response Rate
              </span>
              <span className="text-sm font-inter font-bold text-gray-900">
                95%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-[#14B8A6] h-2 rounded-full"
                style={{ width: "95%" }}
              ></div>
            </div>
          </div>

          {/* Success Rate */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-instrument text-gray-600">
                Success Rate
              </span>
              <span className="text-sm font-inter font-bold text-gray-900">
                {stats.totalListings > 0
                  ? Math.round((stats.totalSold / stats.totalListings) * 100)
                  : 0}
                %
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{
                  width: `${
                    stats.totalListings > 0
                      ? (stats.totalSold / stats.totalListings) * 100
                      : 0
                  }%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </Card>

      {/* Activity Chart Placeholder */}
      <Card>
        <h3 className="font-inter font-semibold text-gray-900 mb-4">
          Activity This Month
        </h3>
        <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
          <p className="text-gray-500 font-instrument">Chart coming soon</p>
        </div>
      </Card>
    </div>
  );
};

export default PerformanceStats;
