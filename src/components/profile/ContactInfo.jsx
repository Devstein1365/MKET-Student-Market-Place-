import React from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendar,
} from "react-icons/fa";

const ContactInfo = ({ profileData, isEditMode, onEdit, formatDate }) => {
  return (
    <div className="space-y-3">
      {/* Email */}
      <div className="flex items-start gap-3">
        <FaEnvelope className="text-gray-400 mt-1 shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-500 font-instrument">Email</p>
          {isEditMode ? (
            <input
              type="email"
              value={profileData.email}
              onChange={(e) =>
                onEdit({ ...profileData, email: e.target.value })
              }
              className="w-full text-sm text-gray-900 font-instrument border-b border-gray-300 focus:outline-none focus:border-[#7E22CE]"
            />
          ) : (
            <p className="text-sm text-gray-900 font-instrument truncate">
              {profileData.email}
            </p>
          )}
        </div>
      </div>

      {/* Phone */}
      <div className="flex items-start gap-3">
        <FaPhone className="text-gray-400 mt-1 shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-500 font-instrument">Phone</p>
          {isEditMode ? (
            <input
              type="tel"
              value={profileData.phone}
              onChange={(e) =>
                onEdit({ ...profileData, phone: e.target.value })
              }
              className="w-full text-sm text-gray-900 font-instrument border-b border-gray-300 focus:outline-none focus:border-[#7E22CE]"
            />
          ) : (
            <p className="text-sm text-gray-900 font-instrument">
              {profileData.phone}
            </p>
          )}
        </div>
      </div>

      {/* Location */}
      <div className="flex items-start gap-3">
        <FaMapMarkerAlt className="text-gray-400 mt-1 shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-500 font-instrument">Location</p>
          {isEditMode ? (
            <select
              value={profileData.location}
              onChange={(e) =>
                onEdit({ ...profileData, location: e.target.value })
              }
              className="w-full text-sm text-gray-900 font-instrument border-b border-gray-300 focus:outline-none focus:border-[#7E22CE]"
            >
              <option>Bosso Campus</option>
              <option>Gidan Kwano</option>
              <option>Main Campus</option>
              <option>Tunga</option>
              <option>Minna Town</option>
            </select>
          ) : (
            <p className="text-sm text-gray-900 font-instrument">
              {profileData.location}
            </p>
          )}
        </div>
      </div>

      {/* Joined Date */}
      <div className="flex items-start gap-3">
        <FaCalendar className="text-gray-400 mt-1 shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-500 font-instrument">Member Since</p>
          <p className="text-sm text-gray-900 font-instrument">
            {formatDate(profileData.joinedDate)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
