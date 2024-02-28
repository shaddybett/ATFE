import {useContext} from 'react'
import { Navbar, Avatar, Dropdown } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import defaultPic from '../assets/images/person-circle.svg'

function Nav() {
    const {logout, currentUser, apiEndpoint} = useContext(UserContext)

  return (
    <header className="shadow-bs-light">
      <Navbar className="-full mx-auto max-w-7xl" fluid rounded>
        <Navbar.Brand href="https://flowbite-react.com">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            M.A.S
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User settings"
                img={currentUser?.avatar_url ? `${apiEndpoint}/${currentUser.avatar_url}` : defaultPic}
                rounded
              />
            }>
            <Dropdown.Header>
              <span className="block truncate text-sm font-medium">
                {currentUser?.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item>
              <Link to="/profile">Profile</Link>
            </Dropdown.Item>
          </Dropdown>
          <button onClick={logout} className="text-blue-800 font-semibold border-l-2 border-neutral-300 pl-2 ml-2">
            Logout
          </button>
          {/* <Navbar.Toggle /> */}
        </div>
        <Navbar.Collapse>
          {/* <Navbar.Link
            className="ml-auto hover:bg-orange-200 hover:text-m-orange"
            href="#">
            Students
          </Navbar.Link> */}
        </Navbar.Collapse>
      </Navbar>
    </header>
  )
}

export default Nav
