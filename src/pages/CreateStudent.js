import React, { useContext } from 'react'
import upload from '../assets/images/upload.svg'
import close from '../assets/images/close.svg'
import Swal from 'sweetalert2'
import { UserContext } from '../context/UserContext'

function CreateStudent({ setShowForm, handleClick }) {
    const {createUser,apiEndpoint, onchange, setOnchange, setLoading} = useContext(UserContext)

  function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const user = Object.fromEntries(formData)

    for (const [el, elTwo] of [...formData.entries()]) {
      if (elTwo.trim() === '') {
        Swal.fire({
          icon: 'error',
          text: 'Fill in all the fields',
        })
        console.log(el)
        return
      }
    }
    user['role_id'] = 3
    createUser(user, 'add-student')
  }

  async function handleUpload(e) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)

    try {
      const authToken = sessionStorage.getItem('authToken')

      const response = await fetch(
        `${apiEndpoint}/upload_students`,{
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      }
      )
      const data = await response.json()

      if (response.ok) {
          Swal.fire({
              title: 'Upload Successful!',
              text: `${data.msg} ${data.emails_in_use.length > 0 ? ', ' +  data.emails_in_use.join(' | ') + ' already in use' : ''}`,
              icon: 'info',
            })
          setOnchange(!onchange)
      } else {
        Swal.fire({
            icon: 'error',
            text: data?.error,
        })
      }
    } catch (error) {
        Swal.fire({
            title: 'Upload Not Successful',
            text: 'Make sure the file contains all the fields',
            icon: 'info',
        })
        console.log(error);
    } finally{
        setLoading(false)
    }
  }

  return (
    <div className="add-student-over">
      <div className="flex flex-col gap-4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center gap-4 ">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold text-center">
              Create Student Profile
            </h3>
            <button
              className=" hover:bg-orange-100 rounded-full p-1"
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
                name="first_name"
                type="text"
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
                name="last_name"
                type="text"
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
                name="phone_number"
                type="text"
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="w-full md:max-w-[300px]">
              <div className="mb-2 block">
                <label htmlFor="course">Course</label>
              </div>
              <input
                className="input"
                id="course"
                name="course"
                type="text"
                required
              />
            </div>
          </div>
          <button className="btn py-3 my-3" type="submit">
            Create Profile
          </button>
        </form>
        <form onSubmit={handleUpload}>
          <div className="text-center mb-6">
            <span className="text-neutral-400 mb-2 block">Or</span>
            <h4>Create from file(csv, xlsx)</h4>
          </div>
          <div className="w-full md:w-2/4 mx-auto">
            <div>
              <div className="mb-2 block">
                <label htmlFor="file-upload" aria-label="file-upload"></label>
              </div>
              <div className="flex min-w-fit w-full rounded-lg border border-neutral-300">
                <input type="file" name="file-upload" id="file-upload" />
              </div>
            </div>
            <button
              className="btn w-full py-3 mt-4 flex items-center gap-2 justify-center"
              type="submit">
              <img className="inline w-5 h-5" src={upload} alt="icon" />
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateStudent
