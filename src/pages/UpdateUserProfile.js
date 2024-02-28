import React, { useContext } from 'react'
import close from '../assets/images/close.svg'
import Swal from 'sweetalert2'
import { UserContext } from '../context/UserContext'

function UpdateUserProfile({setShowForm, handleClick, currentUser}) {
    const {updateProfile} = useContext(UserContext)

    function handleSubmit(e){
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const password = formData.get('password')
        const password2 = formData.get('password2')
        if (password !== password2) {
          Swal.fire({
            icon: 'error',
            text: 'Passwords do not match!',
          })
          return
        }
        const user = Object.fromEntries(formData)
        delete user.password2
        console.log(user['file-upload'] === '');
        updateProfile(user)
    }

  return (
    <div className="add-teacher-over">
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col justify-center gap-4 max-w-md md:max-w-3xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold text-center">
            Update Your Profile
          </h3>
          <button
            className="hover:bg-orange-100 rounded-full p-1"
            onClick={handleClick}
            type="button">
            <img className="inline w-7 h-7" src={close} alt="icon" />
          </button>
        </div>
        <div className="form-row">
          <div className="w-full">
            <div className="mb-2 block">
              <label htmlFor="first_name">First Name</label>
            </div>
            <input
              className="input"
              id="first_name"
              name='fist_name'
              type="text"
              defaultValue={currentUser?.first_name}
              required
            />
          </div>
          <div className="w-full">
            <div className="mb-2 block">
              <label htmlFor="last_name">Last Name</label>
            </div>
            <input
              className="input"
              id="last_name"
              name='last_name'
              type="text"
              defaultValue={currentUser?.last_name}
              required
            />
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
              name="email"
              type="email"
              placeholder="name@flowbite.com"
              defaultValue={currentUser?.email}
              required
            />
          </div>
          <div className="w-full">
            <div className="mb-2 block">
              <label htmlFor="phone_number">Phone Number</label>
            </div>
            <input
              className="input"
              id="phone_number"
              name='phone_number'
              type="text"
              defaultValue={currentUser?.phone_number}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="w-full md:max-w-[300px]">
            <div className="mb-2 block">
              <label htmlFor="password">Password</label>
            </div>
            <input className="input" id="password" name='password' type="password" placeholder='********' required />
          </div>
          <div className="w-full md:max-w-[300px]">
            <div className="mb-2 block">
              <label htmlFor="password2">Confirm Password</label>
            </div>
            <input className="input" id="password2" name='password2' type="password" placeholder='********' required />
          </div>
        </div>
        <div className="w-full md:w-2/4">
          <div className="mb-2 block">
            <label htmlFor="file-upload" aria-label="file-upload">Profile Picture</label>
          </div>
          <div className="flex min-w-fit w-full rounded-lg border border-neutral-300">
            <input type="file" name="file-upload" id="file-upload" />
          </div>
        </div>
        
        <button className="btn py-3 my-3 ml-auto w-fit items-center " type="submit">
          Update Profile
        </button>
      </form>
    </div>
  )
}

export default UpdateUserProfile;
