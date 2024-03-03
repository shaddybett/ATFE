import React, { useContext } from 'react'
import close from '../assets/images/close.svg';
import upload from '../assets/images/upload.svg'
import Swal from 'sweetalert2';
import { UserContext } from '../context/UserContext';
import { useParams } from 'react-router-dom';

function AddToClass({handleClick}) {
    const {apiEndpoint, setLoading, onchange, setOnchange} = useContext(UserContext)
    const {id} = useParams()

    async function handleSubmit(e){
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const email = formData.get('email')
        if (email.trim() === ''){
            Swal.fire({
            icon: 'error',
            text: 'Fill in all the fields',
            })
            return
        }
        setLoading(true)
        try {
            const resp = await fetch(`${apiEndpoint}/class/${id}/student`, {
                method:'POST',
                headers:{
                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({email})
            })
            const data = await resp.json()
            if (!resp.ok){
                Swal.fire({
                    icon: 'error',
                    text: data.error,
                })
            } else {
                 Swal.fire({
                    title: 'Success!',
                    text: data.message,
                    icon: 'success',
                })
                setOnchange(!onchange)
            }
        } catch (error) {
            console.log(error);
        } finally{
            setLoading(false)
        }
    }

    async function handleUpload(e) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)

    try {
      const authToken = sessionStorage.getItem('authToken')

      const response = await fetch(
        `${apiEndpoint}/upload_students/${id}`,{
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
              text: `${data.msg} ${data.emails_in_use.length > 0? ', ' + data.emails_in_use.join(' | ') + ' already in the class' : ''} ${data.not_found.length > 0? ', ' + data.not_found.join(' | ') + ' not found' : ''}`,          
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
            text: 'Make sure the file contains an email field',
            icon: 'info',
        })
        console.log(error);
    } finally{
        setLoading(false)
    }
  }
  return (
    <div className="add-to-class-over" id='add-to-class'>
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit} className="flex w-full flex-col justify-center gap-4  ">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold text-center">Add students to class</h3>
          <button
            className="hover:bg-orange-100 rounded-full p-1"
            onClick={handleClick}
            type="button"
          >
            <img className="inline w-7 h-7" src={close} alt="icon" />
          </button>
        </div>

        <div className="form-row">
          <div className="w-full">
            <div className="mb-2 block">
              <label htmlFor="email">Enter student email</label>
            </div>
            <input
              className="input"
              id="email"
              name='email'
              type="email"
              required
            />
          </div>
        </div>
        
        <button className="btn py-3 my-3" type="submit">
          + Add
        </button>
      </form>
      <form onSubmit={handleUpload}>
          <div className="text-center mb-6">
            <span className="text-neutral-400 mb-2 block">Or</span>
            <h4>Add from file(csv, xlsx)</h4>
          </div>
          <div className="w-full mx-auto">
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

export default AddToClass
