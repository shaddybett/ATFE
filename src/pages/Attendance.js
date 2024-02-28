import React from 'react'
import close from '../assets/images/close.svg'
import { Button } from 'flowbite-react';


function Attendance({setShowForm, handleClose}) {
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
            Update Attendance
          </h3>
          <button
            className="hover:bg-orange-100 rounded-full p-1"
            onClick={handleClose}
            type="button">
            <img className="inline w-7 h-7" src={close} alt="icon" />
          </button>
        </div>
        <p>Name:</p>
        <p>Status:</p>

        <div className="flex items-center gap-4">
            <button className="px-4 rounded-lg py-3 my-3 w-fit bg-green-300" type="submit">
              Present
            </button>
            <button className="btn py-3 my- w-fit" type="submit">
              Update
            </button>
        </div>
      </form>
    </div>  )
}

export default Attendance