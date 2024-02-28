import React from 'react'
import Nav from '../components/Nav'
import alarm from '../assets/images/alarm-sharp.svg'
import present from '../assets/images/person-add-sharp.svg'
import absent from '../assets/images/person-remove-sharp.svg'
import people from '../assets/images/people-sharp.svg'
import download from '../assets/images/download.svg'
import { Table } from 'flowbite-react'

function ClassDetail() {
  return (
    <div>
      <Nav />
      <main className="w-full max-w-7xl mx-auto px-4 py-6 ">
        <h1 className="text-3xl">Programming with python</h1>
        <section>
          <div className="flex flex-wrap justify-center sm:justify-start py-8 gap-4">
            <div className="card">
              <img src={people} alt="icon" />
              <div>
                <span className="block text-xl font-semibold">47</span>
                <span className="font-medium">Total Students</span>
              </div>
            </div>
            <div className="card">
              <img src={present} alt="icon" />
              <div>
                <span className="block text-xl font-semibold">47</span>
                <span className="font-medium">Present Today</span>
              </div>
            </div>
            <div className="card">
              <img src={absent} alt="icon" />
              <div>
                <span className="block text-xl font-semibold">47</span>
                <span className="font-medium">Absent Today</span>
              </div>
            </div>
            <div className="card">
              <img src={alarm} alt="icon" />
              <div>
                <span className="block text-xl font-semibold">47</span>
                <span className="font-medium">Late Today</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-4">
              <h4 className="font-semibold text-lg text-nowrap">
                Attendance for today
              </h4>
              <input type="date" className="input max-w-[240px]" />
            </div>
            <div className="flex items-center gap-2">
              <button className="btn py-2">+ Add student</button>
              <a className="btn py-2 flex items-center gap-2" href=".">
                <span>Export</span>
                <img className="w-5 h-5" src={download} alt="icon" />
              </a>
            </div>
          </div>
        </section>
        <div className="overflow-x-auto mt-8">
          <Table striped>
            <Table.Head>
              <Table.HeadCell className="break-normal">Name</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell className="break-normal">
                Phone Number
              </Table.HeadCell>
              <Table.HeadCell>Time in</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Change</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              <Table.Row className="bg-white">
                <Table.Cell>Mike Scott</Table.Cell>
                <Table.Cell>examle@gmail.com</Table.Cell>
                <Table.Cell>+25684855</Table.Cell>
                <Table.Cell>12:00</Table.Cell>
                <Table.Cell>Present</Table.Cell>
                <Table.Cell>
                  <a
                    href="/students"
                    className="font-medium text-m-orange hover:underline">
                    Update
                  </a>
                </Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white">
                <Table.Cell>Mike Scott</Table.Cell>
                <Table.Cell>examle@gmail.com</Table.Cell>
                <Table.Cell>+25684855</Table.Cell>
                <Table.Cell>13:00</Table.Cell>
                <Table.Cell>Present</Table.Cell>
                <Table.Cell>
                  <a
                    href="/students"
                    className="font-medium text-m-orange hover:underline">
                    Update
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

export default ClassDetail
