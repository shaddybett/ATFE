import React, { useContext, useEffect, useState } from 'react'
import Nav from '../components/Nav'
import CreateTeacher from './CreateTeacher'
import EditTeacher from './EditTeacher'
import Loading from '../components/Loading'
import { Table } from 'flowbite-react'
import grad from '../assets/images/grad.svg'
import chevRight from '../assets/images/chevron-forward-outline.svg'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import Swal from 'sweetalert2'


function AdminDashboard() {
    const [showForm, setShowForm] = useState(false)
    const [showEditTeacherForm, setShowEditTeacherForm] = useState(false)
    const [selectedTeacher, setSelectedTeacher] = useState({})
    const [teachersCopy, setTeachersCopy] = useState([])
    const [teachers, setTeachers] = useState([])
    const { onchange, apiEndpoint, deleteUser, loading, setLoading} = useContext(UserContext)

     useEffect(() => {
        setLoading(true)
       fetch(`${apiEndpoint}/teachers`, {
         method: 'GET',
         headers: {
           Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
         },
       })
         .then((res) => res.json())
         .then((data) => {
           setTeachers(data)
           setTeachersCopy(data)
           setLoading(false)
         })
     }, [apiEndpoint, onchange, setLoading])

    function handleClick(){
        setShowForm(!showForm)
    }

    function handleEditTeacher(teacher) {
        setShowEditTeacherForm(!showEditTeacherForm)
        setSelectedTeacher(teacher)
    }

    function handleSearch(e) {
    const filteredTeachers = teachers.filter((teacher) => {
        const searchValue = e.currentTarget.value.toLowerCase()
        return (
        teacher.email.toLowerCase().includes(searchValue) ||
        teacher.first_name.toLowerCase().includes(searchValue) ||
        teacher.last_name.toLowerCase().includes(searchValue)
        )
    })
    setTeachersCopy(filteredTeachers)
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
        deleteUser(id)
        const newList = teachers.filter((teacher) => teacher.teacher_id !== id)
        setTeachers(newList)
        setTeachersCopy(newList)
        }
    })
    }
    if (!sessionStorage.getItem('authToken')) {
      return
    }

    return (
      <div>
        {showForm && (
          <CreateTeacher handleClick={handleClick} setShowForm={setShowForm} />
        )}
        {loading && <Loading />}
        {showEditTeacherForm && (
          <EditTeacher
            handleEditTeacher={handleEditTeacher}
            setShowEditTeacherForm={setShowEditTeacherForm}
            selectedTeacher={selectedTeacher}
          />
        )}
        <Nav />
        <main className="container">
          <div className="flex gap-4 my-14">
            <Link to="/students" className="block w-full max-w-[350px]">
              <div className="flex gap-4 items-center px-4 pb-4 pt-14 rounded-lg bg-light-orange hover:bg-t-orange transition">
                <img className="w-12 h-12" src={grad} alt="icon" />
                <div className="flex justify-between w-full items-end">
                  <h3 className="text-4xl font-medium">Students</h3>
                  <img className="w-7 h-7" src={chevRight} alt="icon" />
                </div>
              </div>
            </Link>
          </div>
          <div className="flex justify-between items-center mb-10 ">
            <h3 className="text-2xl font-semibold">Teachers</h3>
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
                <label aria-label="search" htmlFor="search" className="">
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
                {teachersCopy?.map((teacher) => {
                  return (
                    <Table.Row key={teacher.teacher_id} className="bg-white">
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {teacher.teacher_id}
                      </Table.Cell>
                      <Table.Cell>{teacher.first_name}</Table.Cell>
                      <Table.Cell>{teacher.last_name}</Table.Cell>
                      <Table.Cell>{teacher.email}</Table.Cell>
                      <Table.Cell>{teacher.department}</Table.Cell>
                      <Table.Cell>{teacher.phone_number}</Table.Cell>
                      <Table.Cell>
                        <span
                          onClick={() => handleEditTeacher(teacher)}
                          className="cursor-pointer font-medium text-m-orange hover:underline">
                          Edit
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span
                          onClick={() => handleDelete(teacher.teacher_id)}
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

export default AdminDashboard



