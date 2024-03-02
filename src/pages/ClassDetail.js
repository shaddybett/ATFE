import React, { useContext, useEffect, useState } from 'react'
import Nav from '../components/Nav'
import alarm from '../assets/images/alarm-sharp.svg'
import present from '../assets/images/person-add-sharp.svg'
import absent from '../assets/images/person-remove-sharp.svg'
import people from '../assets/images/people-sharp.svg'
import download from '../assets/images/download.svg'
import { Table } from 'flowbite-react'
import { UserContext } from '../context/UserContext'
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading'

const today = new Date()
const year = today.getFullYear()
const month = String(today.getMonth() + 1).padStart(2, '0')
const date = String(today.getDate()).padStart(2, '0')

const formtattedDate = year + '-'+ month + '-' + date

function ClassDetail() {
    const [details , setDetails] = useState({})
    const [detailsDate, setDetailsDate] = useState(formtattedDate)
    const {apiEndpoint, loading, setLoading} = useContext(UserContext)
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
  }, [detailsDate, apiEndpoint, id,setLoading]); 

  function handleDateChange(e){
    setDetailsDate(e.currentTarget.value)
  }

  return (
    <div className='font-poppins text-navy-blue'>
        {loading && <Loading />}
      <Nav />
      <main className="w-full max-w-7xl mx-auto px-4 py-6 ">
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
              <input type="date" onChange={handleDateChange} className="input max-w-[240px]" />
            </div>
            <div className="flex items-center gap-2">
            <div className="flex gap-2 items-center">
              <input
                className="input "
                id="search"
                type="text"
                required
                // onChange={handleSearch}
                placeholder="Search Students"
              />
              <label aria-label="search" htmlFor="search" >
                {/* <img className="w-6 h-6 object-cover" src={search} alt="" /> */}
              </label>
            </div>
              <button className="btn py-2">+Add </button>
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
                <Table.Cell>
                  <a
                    href="/students"
                    className="font-medium text-m-orange hover:underline">
                    Update
                  </a>
                </Table.Cell>
                <Table.Cell className="font-medium text-m-orange hover:underline">Remove</Table.Cell>
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
