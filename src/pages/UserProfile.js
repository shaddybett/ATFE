import React,{ useState } from "react";
import Nav from "../components/Nav";
import { Link } from "react-router-dom";
import UpdateUserProfile from "./UpdateUserProfile"


function UserProfile() {
  const [showForm, setShowForm] = useState(false)
    function handleClick(){
        setShowForm(!showForm)
    }
  return (
    <div>
      {showForm  && <UpdateUserProfile handleClick={handleClick} setShowForm={setShowForm}/>}
      <Nav />
      <div className="max-w-7xl mx-auto px-4 py-8 flex">
        {/* Left Column */}
        <div className="w-1/3 pr-8">
          {/* User Image */}
          <img
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            alt="User Profile"
            className="w-full rounded-lg"
          />
        </div>
        {/* Right Column */}
        <div className="w-2/3">
          {/* User Details */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">User Details</h2>
            <div className="mb-2">
              <span className="font-semibold">First Name:</span> John
            </div>
            <div className="mb-2">
              <span className="font-semibold">Last Name:</span> Doe
            </div>
            <div className="mb-2">
              <span className="font-semibold">Email:</span> john@example.com
            </div>
            <div className="mb-2">
              <span className="font-semibold">Department:</span> IT
            </div>
            <div className="mb-2">
              <span className="font-semibold">Course:</span> Computer Science
            </div>
            <div className="mb-2">
              <span className="font-semibold">Phone Number:</span> +123456789
            </div>
            {/* Update Button */}
            <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
             Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
