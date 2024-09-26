"use client";

import React, { useState } from "react";
import Image from "next/image";

const EditSetting = ({ firstName, lastName, role, branch, email, onSave, profileImage }) => {
  const [inputFirstName, setInputFirstName] = useState(firstName);
  const [inputLastName, setInputLastName] = useState(lastName);
  const [inputRole, setInputRole] = useState(role);
  const [inputBranch, setInputBranch] = useState(branch);
  const [inputEmail, setInputEmail] = useState(email);
  const [uploadedImage, setUploadedImage] = useState(profileImage);

  // Function to handle saving changes
  const handleSaveClick = () => {
    console.log('Save Clicked with Image:', uploadedImage);
    onSave({
      firstName: inputFirstName,
      lastName: inputLastName,
      role: inputRole,
      branch: inputBranch,
      email: inputEmail,
      profileImage: uploadedImage, 
    });
  };
  

  // Function to handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result); // Update the profile image state
        console.log('Uploaded Image in EditSetting:', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="border mb-5 mt-8 rounded-lg p-6 h-[400px] w-full ml-1">
        <div className="flex items-center justify-between mt-1">
          <div className="font-bold text-xl">
            <label>Account</label>
          </div>
          <button
            aria-label="save"
            className="bg-white font-bold text-blue-500 border border-blue-500 text-sm py-2 px-4 rounded hover:bg-white"
            onClick={handleSaveClick}
          >
            <span className="ml-1">Save</span>
          </button>
        </div>

        <div className="flex">
          <table className="w-full border-collapse">
            <tbody>
              <tr>
                <td className="pr-1">
                  <div className="font-bold text-sm mt-6 text-black mb-1">
                    First Name
                  </div>
                  <input
                    type="text"
                    className="py-2 bg-slate-100 text-left text-gray-500 font-bold mb-8 text-sm pl-3 h-10 rounded-lg w-full box-border"
                    value={inputFirstName}
                    onChange={(e) => setInputFirstName(e.target.value)}
                  />
                </td>
                <td className="pl-1">
                  <div className="font-bold text-sm mt-6 text-black mb-1">
                    Last Name
                  </div>
                  <input
                    type="text"
                    className="py-2 bg-slate-100 text-left text-gray-500 font-bold mb-8 text-sm pl-3 h-10 rounded-lg w-full box-border"
                    value={inputLastName}
                    onChange={(e) => setInputLastName(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td className="pr-1">
                  <div className="font-bold text-sm text-black mb-1">Role</div>
                  <input
                    type="text"
                    className="py-2 bg-slate-100 text-left text-gray-500 mb-8 font-bold text-sm pl-3 h-10 rounded-lg w-full box-border"
                    value={inputRole}
                    onChange={(e) => setInputRole(e.target.value)}
                  />
                </td>
                <td className="pl-1">
                  <div className="font-bold text-sm text-black mb-1">
                    Branch
                  </div>
                  <input
                    type="text"
                    className="py-2 bg-slate-100 text-left text-gray-500 mb-8 font-bold text-sm pl-3 h-10 rounded-lg w-full box-border"
                    value={inputBranch}
                    onChange={(e) => setInputBranch(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <div className="font-bold text-sm text-black mb-1">
                    Email Address
                  </div>
                  <input
                    type="text"
                    className="py-2 bg-slate-100 text-left text-gray-500 font-bold text-sm pl-3 h-10 rounded-lg w-full box-border"
                    value={inputEmail}
                    onChange={(e) => setInputEmail(e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <div className="w-1/3 mr-[-55px]">
            <div className="flex flex-col items-center relative mt-7">
              <Image
                src={uploadedImage}
                alt="Profile"
                width={130}
                height={100}
                className="rounded-[50%] object-cover block"
              />
              <label
                htmlFor="fileInput"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-white text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-blue-600 text-primary-foreground hover:bg-blue-600/90 py-2 px-4"
               >
                update
              </label>
              <input
                type="file"
                accept="image/*"
                id="fileInput"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSetting;
