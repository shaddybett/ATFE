import React, { useEffect, useState } from 'react';
import close from '../assets/images/close.svg';
import { useClassContext } from '../context/ClassContext';

function EditClass({ setShowEditClassForm, handleEditClass, selectedClass }) {
  const { fetchClassDetails, updateClass, classDetails } = useClassContext();

  const handleChange = (e) => {
    // setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit =  (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget)

  const updatedData = Object.fromEntries(formData)
  updateClass(selectedClass.id, updatedData)
    
  };

  return (
    <div className="add-class-over" id="add-class">
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col justify-center gap-4  "
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold text-center">
            Edit Class Details
          </h3>
          <button
            className="hover:bg-orange-100 rounded-full p-1"
            onClick={handleEditClass}
            type="button"
          >
            <img className="inline w-7 h-7" src={close} alt="icon" />
          </button>
        </div>
        <div className="form-row">
          <div className="w-full">
            <div className="mb-2 block">
              <label htmlFor="class_name">Class Name</label>
            </div>
            <input
              className="input"
              id="class_name"
              name='class_name'
              type="text"
              required
              defaultValue={selectedClass.class_name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="w-full">
            <div className="mb-2 block">
              <label htmlFor="start_date">Start date</label>
            </div>
            <input
              className="input"
              id="start_date"
              name='start_date'
              type="date"
              required
              defaultValue={selectedClass.start_date.split(" ")[0]}
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <div className="mb-2 block">
              <label htmlFor="end_date">End date</label>
            </div>
            <input
              className="input"
              id="end_date"
              name='end_date'
              type="date"
              required
              defaultValue={selectedClass.end_date.split(" ")[0]}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="">
            <div className="mb-2 block">
              <label htmlFor="start_time">Starts at</label>
            </div>
            <input
              className="input"
              id="start_time"
              name='start_time'
              type="time"
              required
              defaultValue={selectedClass.start_time}
              onChange={handleChange}
            />
          </div>
          <div className="">
            <div className="mb-2 block">
              <label htmlFor="end_time">Ends at</label>
            </div>
            <input
              className="input"
              id="end_time"
              name='end_time'
              type="time"
              required
              defaultValue={selectedClass.end_time}
              onChange={handleChange}
            />
          </div>
        </div>

        <button className="btn py-3 my-3" type="submit">
          Update Class
        </button>
      </form>
    </div>
  );
}

export default EditClass;
