import React from "react";
import { Navbar, Avatar, Dropdown } from "flowbite-react";
import { Link } from "react-router-dom";

function Nav() {
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
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">Bonnie Green</span>
              <span className="block truncate text-sm font-medium">
                name@flowbite.com
              </span>
            </Dropdown.Header>
            <Dropdown.Item>
              <Link to="/userprofile">Profile</Link>
            </Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
      </Navbar>
    </header>
  );
}

export default Nav;
