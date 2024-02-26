import React, { useState } from 'react'
import Nav from '../components/Nav'
import CreateTeacher from './CreateTeacher'
import { Table } from 'flowbite-react'

function AdminDashboard() {
    const [showForm, setShowForm] = useState(false)
    function handleClick(){
        setShowForm(!showForm)
    }
  return (
    <div>
        {showForm && <CreateTeacher handleClick={handleClick} setShowForm={setShowForm} />}
      <Nav />
      <main className="container">
        <div className="flex justify-between items-center mb-10 mt-14">
          <h3 className="text-2xl font-semibold">Faculties</h3>
          <button onClick={handleClick} className="btn py-2">+ Add</button>
        </div>
        <div className="overflow-x-auto">
          <Table striped>
            <Table.Head>
              <Table.HeadCell>ID</Table.HeadCell>
              <Table.HeadCell>First Name</Table.HeadCell>
              <Table.HeadCell>Last Name</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Department</Table.HeadCell>
              <Table.HeadCell>Phone Number</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Delete</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              <Table.Row className="bg-white">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">54215
                </Table.Cell>
                <Table.Cell>Mike</Table.Cell>
                <Table.Cell>Scott</Table.Cell>
                <Table.Cell>examle@gmail.com</Table.Cell>
                <Table.Cell>IT</Table.Cell>
                <Table.Cell>+25684855</Table.Cell>
                <Table.Cell>
                  <a
                    href="#"
                    className="font-medium text-m-orange hover:underline">
                    Edit
                  </a>
                </Table.Cell>
                <Table.Cell>
                  <a
                    href="#"
                    className="font-medium text-m-orange hover:underline">
                    Delete
                  </a>
                </Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">54215
                </Table.Cell>
                <Table.Cell>Mike</Table.Cell>
                <Table.Cell>Scott</Table.Cell>
                <Table.Cell>examle@gmail.com</Table.Cell>
                <Table.Cell>IT</Table.Cell>
                <Table.Cell>+25684855</Table.Cell>
                <Table.Cell>
                  <a
                    href="#"
                    className="font-medium text-m-orange hover:underline">
                    Edit
                  </a>
                </Table.Cell>
                <Table.Cell>
                  <a
                    href="#"
                    className="font-medium text-m-orange hover:underline">
                    Delete
                  </a>
                </Table.Cell>
              </Table.Row>
              
            </Table.Body>
          </Table>
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard
