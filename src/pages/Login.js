import {useContext} from 'react'
import lock from '../assets/images/lock.svg'
import { Label } from 'flowbite-react'
import { UserContext } from '../context/UserContext'
import Swal from 'sweetalert2'
import Loading from '../components/Loading'

function Login() {
    const {login, loading} = useContext(UserContext)

    function handleSubmit(e){
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const email = formData.get('email')
        const password = formData.get('password')

        if (password.trim() !== '' && email.trim() !== ''){
            login(email, password);
        } else {
            Swal.fire({
              icon: 'error',
              text: 'Fill in all the fields',
            })
        }
    }

  return (
    <div className="login-container">
      {loading && <Loading />}
      <div className="form-container">
        <div>
          <h2 className="text-3xl font-semibold text-center md:text-left">
            <span className="md:block">Moringa </span>Attendance System
          </h2>
          <div className="min-w-[300px]">
            <img className="mx-auto" src={lock} alt="illustration" />
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col justify-center gap-4">
          <h3 className="text-xl font-semibold text-center">Login</h3>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Your email" />
            </div>
            <input
              className="input"
              id="email"
              type="email"
              name='email'
              autoComplete='on'
              placeholder="name@example.com"
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Your password" />
            </div>
            <input
              className="input"
              id="password"
              name="password"
              placeholder="*********"
              type="password"
              autoComplete="current-password"
              required
            />
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
