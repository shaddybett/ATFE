import React from 'react'
import { Navbar, Avatar, Dropdown } from 'flowbite-react'

function Nav() {
  return (
    <header className="shadow-bs-light">
        <Navbar className='-full mx-auto max-w-7xl' fluid rounded>
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
                  img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  rounded
                />
              }>
              <Dropdown.Header>
                <span className="block text-sm">Bonnie Green</span>
                <span className="block truncate text-sm font-medium">
                  name@flowbite.com
                </span>
              </Dropdown.Header>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Dropdown>
            <Navbar.Toggle />
          </div>
          <Navbar.Collapse>
            <Navbar.Link className='ml-auto hover:bg-orange-200 hover:text-m-orange' href="#">Students</Navbar.Link>
          </Navbar.Collapse>
        </Navbar>
    </header>
  )
}

export default Nav
