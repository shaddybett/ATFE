import React,{ useState, useContext } from "react";
import Nav from "../components/Nav";
import UpdateUserProfile from "./UpdateUserProfile"
import { UserContext } from "../context/UserContext";


function UserProfile() {
  const [showForm, setShowForm] = useState(false)
  const {currentUser} = useContext(UserContext)

    function handleClick(){
        setShowForm(!showForm)
    }
  return (
    <div>
      {showForm && (
        <UpdateUserProfile
          handleClick={handleClick}
          setShowForm={setShowForm}
          currentUser={currentUser}
        />
      )}
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
              <span className="font-semibold">Department:</span>{' '}
              {currentUser?.department}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Course:</span>{' '}
              {currentUser?.course}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Phone Number:</span>{' '}
              {currentUser?.phone_number}
            </div>
            {/* Update Button */}
            <button
              onClick={handleClick}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile;
