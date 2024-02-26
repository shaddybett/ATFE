import React from 'react'
import lock from '../assets/images/lock.svg'
import { Label } from 'flowbite-react'

function Login() {
  return (
    <div className="login-container">
      <div className="form-container">
        <div>
          <h2 className="text-3xl font-semibold text-center md:text-left">
            <span className="md:block">Moringa </span>Attendance System
          </h2>
          <div className="min-w-[300px]">
            <img className="mx-auto" src={lock} alt="illustration" />
          </div>
        </div>
        <form className="flex w-full flex-col justify-center gap-4">
          <h3 className="text-xl font-semibold text-center">Login</h3>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Your email" />
            </div>
            <input
              className="input"
              id="email"
              type="email"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Your password" />
            </div>
            <input className="input" id="password" type="password" required />
          </div>
          <button className="btn py-3" type="submit">
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
