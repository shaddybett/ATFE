import React, { useContext, useEffect, useState } from 'react'
import { Table } from 'flowbite-react'
import CreateStudent from './CreateStudent'
import Nav from '../components/Nav'
import Loading from '../components/Loading'
import EditStudent from './EditStudent'
import { UserContext } from '../context/UserContext'
// import search from '../assets/images/search.svg'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

function StudentsPage() {
  const [showForm, setShowForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [studentsCopy, setStudentsCopy] = useState([])
  const { onchange, apiEndpoint, deleteUser,currentUser, loading, setLoading } =
    useContext(UserContext)
  const [selectedStudent, setSelectedStudent] = useState({})
  const [students, setStudents] = useState([])

  useEffect(() => {
    setLoading(true)
    fetch(`${apiEndpoint}/students`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setStudents(data)
        setStudentsCopy(data)
        setLoading(false)
      })
  }, [apiEndpoint, onchange, setLoading])

  function handleClick() {
    setShowForm(!showForm)
  }

  function handleEdit(student) {
    setShowEditForm(!showEditForm)
    setSelectedStudent(student)
  }

  function handleSearch(e) {
    const filteredStudents = students.filter((student) => {
      const searchValue = e.currentTarget.value.toLowerCase()
      return (
        student.email.toLowerCase().includes(searchValue) ||
        student.first_name.toLowerCase().includes(searchValue) ||
        student.last_name.toLowerCase().includes(searchValue)
      )
    })
    setStudentsCopy(filteredStudents)
  }

  function handleDelete(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: 'gray',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true)
        deleteUser(id)
        const newList = students.filter((student) => student.student_id !== id)
        setStudents(newList)
        setStudentsCopy(newList)
      }
    })
  }

  return (
    <div
      className={
        loading || showForm || showEditForm ? 'overflow-hidden h-full max-h-[100vh]' : ''
      }>
      {showForm && (
        <CreateStudent handleClick={handleClick} setShowForm={setShowForm} />
      )}
      {loading && <Loading />}
      {showEditForm && (
        <EditStudent
          handleEdit={handleEdit}
          setShowEditForm={setShowEditForm}
          selectedStudent={selectedStudent}
          setSelectedStudent={setSelectedStudent}
        />
      )}

      <Nav />
      <main className="container">
        <Link to={currentUser?.role_id === 2 ? '/teacher': '/admin'} className='inline-block mt-6 px-3 bg-neutral-100 hover:bg-neutral-200 shadow' >Back</Link>
        <div className="flex flex-col md:flex-row gap-2 justify-between md:items-center mb-10 mt-8">
          <h3 className="text-2xl font-semibold">Students</h3>
          <div className="flex items-center gap-4">
            <div className="flex gap-2 items-center">
              <input
                className="input "
                id="search"
                type="text"
                required
                onChange={handleSearch}
                placeholder="Search"
              />
              <label aria-label="search" htmlFor="search">
                {/* <img className="w-6 h-6 object-cover" src={search} alt="" /> */}
              </label>
            </div>
            <button onClick={handleClick} className="btn min-w-fit py-2">
              + Add
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table striped>
            <Table.Head>
              <Table.HeadCell>Id</Table.HeadCell>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Course</Table.HeadCell>
              <Table.HeadCell>Phone Number</Table.HeadCell>

              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Delete</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {studentsCopy?.map((student) => {
                return (
                  <Table.Row key={student.student_id} className="bg-white">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {student.student_id}
                    </Table.Cell>
                    <Table.Cell>{student.first_name} {student.last_name}</Table.Cell>
                    <Table.Cell>{student.email}</Table.Cell>
                    <Table.Cell>{student.course}</Table.Cell>
                    <Table.Cell>{student.phone_number}</Table.Cell>
                    {/* <Table.Cell className="font-medium text-m-orange hover:underline cursor-pointer">
                      Download Report
                    </Table.Cell> */}
                    <Table.Cell>
                      <span
                        onClick={() => handleEdit(student)}
                        className="font-medium text-m-orange hover:underline cursor-pointer">
                        Edit
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => handleDelete(student.student_id)}
                        className="font-medium text-m-orange hover:underline cursor-pointer">
                        Delete
                      </span>
                    </Table.Cell>
                  </Table.Row>
                )
              })}
            </Table.Body>
          </Table>
        </div>
      </main>
    </div>
  )
}

export default StudentsPage
