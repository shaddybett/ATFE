import React from 'react'
import close from '../assets/images/close.svg'


function CreateClass({ setShowForm, handleClose }) {
  function handleSubmit(e) {
    e.preventDefault()
  }
  return (
    <div className="add-class-over" id='add-class'>
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col justify-center gap-4  ">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold text-center">
            Create Class
          </h3>
          <button
            className="hover:bg-orange-100 rounded-full p-1"
            onClick={handleClose}
            type="button">
            <img className="inline w-7 h-7" src={close} alt="icon" />
          </button>
        </div>
        <div className="form-row">
          <div className="w-full">
            <div className="mb-2 block">
              <label htmlFor="class_name">Class Name</label>
            </div>
            <input className="input" id="class_name" type="text" required />
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
              type="date"
              required
            />
          </div>
          <div className="w-full">
            <div className="mb-2 block">
              <label htmlFor="end_date">End date</label>
            </div>
            <input className="input" id="end_date" type="date" required />
          </div>
        </div>
        <div className="form-row">
          <div className="">
            <div className="mb-2 block">
              <label htmlFor="starts_at">Starts at</label>
            </div>
            <input className="input" id="starts_at" type="time" required />
          </div>
          <div className="">
            <div className="mb-2 block">
              <label htmlFor="ends_at">Ends at</label>
            </div>
            <input className="input" id="ends_at" type="time" required />
          </div>
        </div>

        <button className="btn py-3 my-3" type="submit">
          Create Class
        </button>
      </form>
    </div>
  )
}

export default CreateClass
