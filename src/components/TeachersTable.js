import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Table } from 'flowbite-react'
import Swal from 'sweetalert2'
import { UserContext } from '../context/UserContext'

function TeachersTable({handleClick, handleEditTeacher}) {
    const [teachersCopy, setTeachersCopy] = useState([])
    const [teachers, setTeachers] = useState([])
    const {apiEndpoint, deleteUser,onchange, setLoading} = useContext(UserContext)

    const fetchTeachers = useCallback(async () => {
        setLoading(true)
        try {
            const resp = await fetch(`${apiEndpoint}/teachers`, {
                method: 'GET',
                headers: {
                Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                },
            })
            const data = await resp.json()
            setTeachers(data)
            setTeachersCopy(data)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    },[apiEndpoint, setLoading])

     useEffect(() => {
        fetchTeachers()
     }, [fetchTeachers, onchange])


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
                setLoading(true)
                deleteUser(id)
                const newList = teachers.filter((teacher) => teacher.teacher_id !== id)
                setTeachers(newList)
                setTeachersCopy(newList)
            }
        })
    }

  return (
    <div>
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
                    <Table.HeadCell>Name</Table.HeadCell>
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
                        <Table.Cell>{teacher.first_name} {teacher.last_name}</Table.Cell>
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
    </div>
    
  )
}

export default TeachersTable
