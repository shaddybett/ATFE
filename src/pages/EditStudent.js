import React from "react";
import close from "../assets/images/close.svg";

function CreateTeacher({ setShowEditForm, handleEdit }) {
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <div className="add-teacher-over">
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col justify-center gap-4 max-w-md md:max-w-3xl"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold text-center">
            Edit Student Profile
          </h3>
          <button
            className="hover:bg-orange-100 rounded-full p-1"
            onClick={handleEdit}
            type="button"
          >
            <img className="inline w-7 h-7" src={close} alt="icon" />
          </button>
        </div>
        <div className="form-row">
          <div className="w-full">
            <div className="mb-2 block">
              <label htmlFor="first_name">First Name</label>
            </div>
            <input className="input" id="first-name" type="text" required />
          </div>
          <div className="w-full">
            <div className="mb-2 block">
              <label htmlFor="last_name">Last Name</label>
            </div>
            <input className="input" id="last-name" type="text" required />
          </div>
        </div>
        <div className="form-row">
          <div className="w-full">
            <div className="mb-2 block">
              <label htmlFor="email">Email</label>
            </div>
            <input
              className="input"
              id="email"
              type="email"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div className="w-full">
            <div className="mb-2 block">
              <label htmlFor="phone_number">Phone Number</label>
            </div>
            <input className="input" id="phone_number" type="text" required />
          </div>
        </div>
        <div className="form-row">
          <div className="w-full md:max-w-[300px]">
            <div className="mb-2 block">
              <label htmlFor="department">Department</label>
            </div>
            <input className="input" id="department" type="text" required />
          </div>
        </div>

        <button className="btn py-3 my-3" type="submit">
          Create Profile
        </button>
      </form>
    </div>
  );
}

export default CreateTeacher;
