import React, { useState } from "react";
import { Table } from "flowbite-react";
import CreateStudent from "./CreateStudent";
import Nav from "../components/Nav";

function AllClasses() {
  const [showForm, setShowForm] = useState(false);
  function handleClick() {
    setShowForm(!showForm);
  }
  return (
    <div>
      {showForm && (
        <CreateStudent handleClick={handleClick} setShowForm={setShowForm} />
      )}
      <Nav />
      <main className="container">
        <div className="flex flex-col md:flex-row gap-2 justify-between md:items-center mb-10 mt-14">
          <h3 className="text-2xl font-semibold">Classes</h3>
          <div className="flex items-center gap-4">
            <div className="flex gap-2 items-center">
              <input
                className="input "
                id="search"
                type="text"
                required
                placeholder="Search"
              />
              <label aria-label="search" htmlFor="search" className="btn py-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
                    fill="none"
                    stroke="currentColor"
                    strokeMiterlimit="10"
                    strokeWidth="32"
                  />
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeMiterlimit="10"
                    strokeWidth="32"
                    d="M338.29 338.29L448 448"
                  />
                </svg>
              </label>
            </div>
            {/* <button onClick={handleClick} className="btn min-w-fit py-2">
              + Add
            </button> */}
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table striped>
            <Table.Head>
              <Table.HeadCell>ID</Table.HeadCell>
              <Table.HeadCell>Class Name</Table.HeadCell>
              <Table.HeadCell>Start Time</Table.HeadCell>
              <Table.HeadCell>End Time</Table.HeadCell>
              <Table.HeadCell>Start Date</Table.HeadCell>
              <Table.HeadCell>End Date</Table.HeadCell>
              <Table.HeadCell>Teacher</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Delete</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              <Table.Row className="bg-white">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  54215
                </Table.Cell>
                <Table.Cell>Mike</Table.Cell>
                <Table.Cell>Scott</Table.Cell>
                <Table.Cell>examle@gmail.com</Table.Cell>
                <Table.Cell>IT</Table.Cell>
                <Table.Cell>+25684855</Table.Cell>

              </Table.Row>
              <Table.Row className="bg-white">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  54215
                </Table.Cell>
                <Table.Cell>Mike</Table.Cell>
                <Table.Cell>Scott</Table.Cell>
                <Table.Cell>examle@gmail.com</Table.Cell>
                <Table.Cell>IT</Table.Cell>
                <Table.Cell>+25684855</Table.Cell>

              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </main>
    </div>
  );
}

export default AllClasses;
