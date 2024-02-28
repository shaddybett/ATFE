import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'

export const UserContext = createContext()

export default function UserProvider({ children }) {
  const [onchange, setOnchange] = useState(false)
  const [authToken, setAuthToken] = useState(() =>
    sessionStorage.getItem('authToken')
      ? sessionStorage.getItem('authToken')
      : null
  )
  const [currentUser, setCurrentUser] = useState(null)

  const navigate = useNavigate()
  // const apiEndpoint = 'https://attendance-tracker-backend-ws6l.onrender.com'
  const apiEndpoint = 'http://127.0.0.1:5000'

  //   Login User
  function login(email, password) {
    fetch(`${apiEndpoint}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.access_token) {
          sessionStorage.setItem('authToken', response.access_token)
          setAuthToken(response.authToken)
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Login successful.',
            showConfirmButton: false,
            timer: 1500,
          })
          setOnchange(!onchange)
          getAuthenticatedUser()
          navigate(`/${response.role}`)
        } else {
          Swal.fire({
            icon: 'error',
            text: response.error,
          })
        }
      })
  }

  // Logout user
  function logout() {
    fetch(`${apiEndpoint}/logout`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
      },
    }).then((response) => {
      if (response.ok) {
        sessionStorage.removeItem('authToken')
        setCurrentUser(null)
        setAuthToken(null)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Logout successful',
          showConfirmButton: false,
          timer: 1500,
        })
        navigate('/login')
      } else {
        Swal.fire({
          icon: 'error',
          text: 'Something went wrong. Try again',
        })
      }
    })
  }

  // Get authenticated user
  function getAuthenticatedUser() {
    if (sessionStorage.getItem('authToken')) {
      fetch(`${apiEndpoint}/authenticated_user`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.email) {
            setCurrentUser(data)
          } else {
            setCurrentUser(null)
          }
        })
    }
  }

  useEffect(() => {
    getAuthenticatedUser()
  }, [authToken, onchange])

  // update user profile
  async function updateProfile(user) {
    try {
      const resp = await axios.patch(
        `${apiEndpoint}/update/${currentUser.user_id}`,
        user,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      setOnchange(!onchange)
      Swal.fire('Success', 'Profile updated successfully', 'success')
      navigate('/profile')
    } catch (error) {
      console.log(error.response.data.error)
      Swal.fire({
        icon: 'error',
        text: error.response.data.error,
      })
    }
  }

  // Context data
  const contextData = {
    login,
    logout,
    authToken,
    apiEndpoint,
    currentUser,
    updateProfile,
    onchange,
    setOnchange,
  }

  return (
    <UserContext.Provider value={contextData}>{children}</UserContext.Provider>
  )
}
