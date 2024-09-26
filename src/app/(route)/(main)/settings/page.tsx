"use client";

import { useState } from "react";
import EditSetting from "@/features/developers/components/EditSetting";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Settings = () => {
  const [accountInfo, setAccountInfo] = useState({
    firstName: "Wade",
    lastName: "Warren",
    role: "Developer",
    branch: "Abcd-123",
    email: "abcd@gmail.com",
    profileImage: "/default-profile.png",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState("/profile.jpeg");

  // Function to handle the edit click
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Function to handle save and update state
  const handleSave = (updatedInfo) => {
    console.log('Profile Image in handleSave:', updatedInfo.profileImage); 
    setAccountInfo(updatedInfo);
    setProfileImage(updatedInfo.profileImage); 
    setIsEditing(false);
  };
  

  // Function to handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Update the profile image
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h1 className="my-6 text-2xl font-bold text-black">Settings</h1>

      {isEditing ? (
        <EditSetting
          {...accountInfo}
          onSave={handleSave}
          profileImage={profileImage}
        />
      ) : (
        <div className="border mb-5 mt-8 rounded-lg p-6 h-[400px] w-full ml-1">
          <div className="flex items-center justify-between mt-1">
            <div className="font-bold text-xl">
              <label>Account</label>
            </div>
            <button
              aria-label="Edit"
              className="bg-white font-bold text-blue-500 border border-blue-500 text-sm py-2 px-4 rounded hover:bg-white"
              onClick={handleEditClick}
            >
              <span className="ml-1">Edit</span>
            </button>
          </div>

          <div className="flex">
            <table className="w-full border-collapse">
              <tbody>
                <tr>
                  <td className="pr-1">
                    <div className="font-bold text-sm mt-6 text-black mb-1">First Name</div>
                    <div className="py-2 bg-slate-100 text-left text-gray-500 font-bold mb-8 text-sm pl-3 h-10 rounded-lg w-full box-border">
                      {accountInfo.firstName}
                    </div>
                  </td>
                  <td className="pl-1">
                    <div className="font-bold text-sm mt-6 text-black mb-1">Last Name</div>
                    <div className="py-2 bg-slate-100 text-left text-gray-500 mb-8 font-bold text-sm pl-3 h-10 rounded-lg w-full box-border">
                      {accountInfo.lastName}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="pr-1">
                    <div className="font-bold text-sm text-black mb-1">Role</div>
                    <div className="py-2 bg-slate-100 text-left text-gray-500 mb-8 font-bold text-sm pl-3 h-10 rounded-lg w-full box-border">
                      {accountInfo.role}
                    </div>
                  </td>
                  <td className="pl-1">
                    <div className="font-bold text-sm text-black mb-1">Branch</div>
                    <div className="py-2 bg-slate-100 text-left text-gray-500 mb-8 font-bold text-sm pl-3 h-10 rounded-lg w-full box-border">
                      {accountInfo.branch}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <div className="font-bold text-sm text-black mb-1">Email Address</div>
                    <div className="py-2 bg-slate-100 text-left text-gray-500 font-bold text-sm pl-3 h-10 rounded-lg w-full box-border">
                      {accountInfo.email}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="w-1/3 mr-[-55px]">
                <div className="flex flex-col items-center relative mt-7">
                  <Image
                    src={profileImage}
                    alt="Profile"
                    width={130}
                    height={100}
                    className="rounded-[50%] object-cover block"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="fileInput"
                  />
                  <label
                  htmlFor="fileInput"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-white text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-blue-600 text-primary-foreground hover:bg-blue-600/90 py-2 px-4"
                 >
                  update
                </label>
                </div>
              </div>
          </div>
        </div>
      )}

      <div className="p-4 bg-white rounded-lg border w-full h-[145px]">
        <div className="flex items-center space-x-4">
          <div className="flex-grow">
            <div className="font-bold text-xl text-black mb-6 mt-2">Password</div>
            <div className="flex items-center bg-slate-100 rounded-lg px-3 h-10" style={{ width: "61rem" }}>
              <div className="py-2 pl-3 font-bold text-gray-500 text-sm">*****</div>
            </div>
          </div>
          <Button type="button" className="bg-pink-700 text-white py-2 px-4 rounded hover:bg-pink-800 mt-6">
            Change Password
          </Button>
        </div>
      </div>

      <div className="mt-4 mb-4 border-red-500">
        <div className="mb-4">
          <label className="font-bold text-lg">Remove Account</label>
          <p className="text-sm text-gray-600 mt-2">
            You can "Disable Account" to take a break from BE U
          </p>
        </div>
        <div className="flex space-x-2">
          <Button type="button" className="bg-pink-700 text-white py-2 px-4 rounded hover:bg-pink-800">
            Disable Account
          </Button>
          <Button type="button" className="bg-pink-200 text-pink-700 py-2 px-4 rounded hover:bg-pink-300">
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
