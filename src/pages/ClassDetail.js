import React, { useContext, useEffect, useState } from 'react'
import Nav from '../components/Nav'
import alarm from '../assets/images/alarm-sharp.svg'
import present from '../assets/images/person-add-sharp.svg'
import absent from '../assets/images/person-remove-sharp.svg'
import people from '../assets/images/people-sharp.svg'
import download from '../assets/images/download.svg'
import { Table } from 'flowbite-react'
import { UserContext } from '../context/UserContext'
import { Link, useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import AddToClass from './AddToClass'
import Swal from 'sweetalert2'

const today = new Date()
const year = today.getFullYear()
const month = String(today.getMonth() + 1).padStart(2, '0')
const date = String(today.getDate()).padStart(2, '0')

const formtattedDate = year + '-'+ month + '-' + date

function ClassDetail() {
    const [details , setDetails] = useState({})
    const [detailsDate, setDetailsDate] = useState(formtattedDate)
    const {apiEndpoint, loading, setLoading, onchange, setOnchange} = useContext(UserContext)
    const [showAddForm, setShowAddForm] = useState(false)
    const {id} = useParams()
    
    useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiEndpoint}/class/${id}/details/${detailsDate}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
          },
        });
        const data = await response.json()
        setDetails(data);
      } catch (error) {
          console.error("Error fetching data:", error);
        } finally{
          setLoading(false)        
      }
    };

    fetchData();
  }, [detailsDate, apiEndpoint, id,setLoading, onchange]); 

  function handleDateChange(e){
    setDetailsDate(e.currentTarget.value)
  }

  function handleClick() {
    setShowAddForm(!showAddForm)
  }

  async function handleRemove(student_id){
    setLoading(true)
    try {
        const resp = await fetch(`${apiEndpoint}/class/${id}/student`, {
            method:'DELETE',
            headers:{
                Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({student_id})
        })
        const data = await resp.json()
        if (!resp.ok){
            Swal.fire({
                icon: 'error',
                text: data.error,
            })
        } else {
                Swal.fire({
                title: 'Success!',
                text: data.message,
                icon: 'success',
            })
            setOnchange(!onchange)
        }
    } catch (error) {
        console.log(error);
    } finally{
        setLoading(false)
    }
  }

  return (
    <div className={
        loading || showAddForm ? 'overflow-hidden h-full max-h-[100vh]' : ''
      }>
        {loading && <Loading />}
        {showAddForm && <AddToClass handleClick={handleClick}/>}
      <Nav />
      <main className="w-full max-w-7xl mx-auto px-4 py-6 ">
      <Link to='/teacher' className='inline-block mb-6 px-3 bg-neutral-100 hover:bg-neutral-200 shadow' >Back</Link>
        <h1 className="text-3xl">{details.class_name}</h1>
        <section>
          <div className="flex flex-wrap justify-center sm:justify-start py-8 gap-4">
            <div className="card">
              <img src={people} alt="icon" />
              <div>
                <span className="block text-xl font-semibold">{details?.total_students}</span>
                <span className="font-medium">Total Students</span>
              </div>
            </div>
            <div className="card">
              <img src={present} alt="icon" />
              <div>
                <span className="block text-xl font-semibold">{details?.present_students}</span>
                <span className="font-medium">Present</span>
              </div>
            </div>
            <div className="card">
              <img src={absent} alt="icon" />
              <div>
                <span className="block text-xl font-semibold">{details?.absent_students}</span>
                <span className="font-medium">Absent</span>
              </div>
            </div>
            <div className="card">
              <img src={alarm} alt="icon" />
              <div>
                <span className="block text-xl font-semibold">{details?.late_students}</span>
                <span className="font-medium">Late</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-4">
              <h4 className="font-semibold text-lg text-nowrap">
                Attendance for {detailsDate === formtattedDate ? 'today' : detailsDate}
              </h4>
              <input type="date" onChange={handleDateChange} className="input max-w-[240px]" id='att-date' />
            </div>
            <div className="flex items-center gap-2">       
              <button className="btn py-2" onClick={handleClick}>+ Add </button>
              <a className="btn py-2 flex items-center gap-2" href={`${apiEndpoint}/download-attendance/${id}/${detailsDate}`}>
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
              {details?.students?.map(student => {
                return <Table.Row key={student.id} className="bg-white">
                <Table.Cell>{student.first_name} {student.last_name}</Table.Cell>
                <Table.Cell>{student.email}</Table.Cell>
                <Table.Cell>{student.phone_number}</Table.Cell>
                <Table.Cell>{student.time_in ? student.time_in : '-'}</Table.Cell>
                <Table.Cell>{student?.attendance_status}</Table.Cell>
                {/* <Table.Cell>
                  <a
                    href="/students"
                    className="font-medium text-m-orange hover:text-orange-500">
                    Update
                  </a>
                </Table.Cell> */}
                <Table.Cell >
                    <button className="font-medium text-m-orange hover:text-orange-500" onClick={() => handleRemove(student.id)}>Remove</button>
                </Table.Cell>
              </Table.Row>
              })}
             
            </Table.Body>
          </Table>
        </div>
      </main>
    </div>
  )
}

export default ClassDetail
