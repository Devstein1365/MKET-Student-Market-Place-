import React from "react";
import { FaCamera, FaCheckCircle, FaEdit } from "react-icons/fa";
import Avatar from "../shared/Avatar";
import Badge from "../shared/Badge";
import Button from "../shared/Button";

const ProfileHeader = ({
  profileData,
  isEditMode,
  onEdit,
  onSave,
  onCancel,
  onAvatarChange,
}) => {
  return (
    <div className="text-center">
      {/* Avatar */}
      <div className="relative inline-block mb-4">
        <Avatar src={profileData.avatar} alt={profileData.name} size="2xl" />
        {isEditMode && (
          <label className="absolute bottom-0 right-0 w-10 h-10 bg-[#7E22CE] text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-[#6B1FB8] transition-colors">
            <FaCamera />
            <input
              type="file"
              accept="image/*"
              onChange={onAvatarChange}
              className="hidden"
            />
          </label>
        )}
      </div>

      {/* Name & Verification */}
      <div className="flex items-center justify-center gap-2 mb-2">
        {isEditMode ? (
          <input
            type="text"
            value={profileData.name}
            onChange={(e) => onEdit({ ...profileData, name: e.target.value })}
            className="text-xl font-inter font-bold text-gray-900 border-b-2 border-[#7E22CE] focus:outline-none text-center"
          />
        ) : (
          <h2 className="text-xl font-inter font-bold text-gray-900">
            {profileData.name}
          </h2>
        )}
        {profileData.verified && (
          <FaCheckCircle className="text-[#14B8A6] text-lg" />
        )}
      </div>

      {/* Bio */}
      {isEditMode ? (
        <textarea
          value={profileData.bio || ""}
          onChange={(e) => onEdit({ ...profileData, bio: e.target.value })}
          placeholder="Tell us about yourself..."
          className="w-full text-sm text-gray-600 font-instrument border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#7E22CE] mb-4"
          rows={3}
        />
      ) : (
        <p className="text-sm text-gray-600 font-instrument mb-4">
          {profileData.bio || "No bio yet"}
        </p>
      )}

      {/* Verification Badge */}
      {!profileData.verified && (
        <div className="mb-4">
          <Badge variant="warning">Not Verified</Badge>
          <p className="text-xs text-gray-500 font-instrument mt-2">
            Verify your account to build trust
          </p>
        </div>
      )}

      {/* Edit/Save Button */}
      <div className="mt-4">
        {isEditMode ? (
          <div className="flex gap-2">
            <Button fullWidth size="sm" onClick={onSave}>
              Save Changes
            </Button>
            <Button fullWidth size="sm" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        ) : (
          <Button
            fullWidth
            variant="outline"
            size="sm"
            icon={<FaEdit />}
            onClick={onEdit}
          >
            Edit Profile
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
