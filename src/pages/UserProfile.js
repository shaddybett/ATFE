import React, { useState, useContext } from "react";
import Nav from "../components/Nav";
import UpdateUserProfile from "./UpdateUserProfile";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

function UserProfile() {
  const [showForm, setShowForm] = useState(false);
  const { currentUser, apiEndpoint } = useContext(UserContext);

  function handleClick() {
    setShowForm(!showForm);
  }

  return (
    <div className="font-poppins text-navy-blue">
      {showForm && (
        <UpdateUserProfile
          handleClick={handleClick}
          setShowForm={setShowForm}
          currentUser={currentUser}
        />
      )}
      <Nav />
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <Link to={currentUser?.role_id === 2 ? '/teacher': '/admin'} className='block w-fit mt-6 px-3 bg-neutral-100 hover:bg-neutral-200 shadow' >Back</Link>
        <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
        <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
          {/* Left Column */}
          <div className="w-full max-w-[300px] mx-auto md:w-1/3">
            {/* User Image */}
            <img
              src={
                currentUser?.avatar_url
                  ? `${apiEndpoint}/${currentUser.avatar_url}`
                  : `${apiEndpoint}/media/blank-profile-picture.webp`
              }
              alt="User Profile"
              className="w-full max-h-[300px] object-cover object-top bg-gray-100 rounded-lg"
            />
          </div>
          {/* Right Column */}
          <div className="w-full max-w-[300px] md:max-w-full md:w-2/3">
            {/* User Details */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8">
              <h2 className="text-xl font-semibold mb-4">User Details</h2>
              <div className="mb-2">
                <span className="font-semibold">First Name:</span>{' '}
                {currentUser?.first_name}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Last Name:</span>{' '}
                {currentUser?.last_name}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Email:</span> {currentUser?.email}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Phone Number:</span>{' '}
                {currentUser?.phone_number}
              </div>
              {/* Update Button */}
              <button
                onClick={handleClick}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
