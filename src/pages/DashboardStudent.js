import React, { useContext, useEffect, useState } from "react";
import Nav from "../components/Nav";
import Swal from "sweetalert2";
import { UserContext } from "../context/UserContext";
import Loading from '../components/Loading'

function DashboardStudent() {
  const { currentUser, apiEndpoint, loading, setLoading, onchange, setOnchange } = useContext(UserContext);
  const [classInfo, setClassInfo] = useState([]);

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiEndpoint}/student`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('authToken')}`, // Corrected interpolation
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setClassInfo(data);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentUser]); 

  async function handleCheckIn(id){
    setLoading(true)
    try {
        const resp = await fetch(`${apiEndpoint}/class/${id}/attendance`, {
            method : 'POST',
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
          },
        })
        setLoading(false)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Succesfully checked in!',
          showConfirmButton: false,
          timer: 1500,
        })
        setOnchange(!onchange)
    } catch (error) {
        setLoading(false)
        Swal.fire({
          icon: 'error',
          text: error,
        })
    }
  }

  return (
    <div>
        {loading && <Loading />}
      <Nav />
      <div className="px-4 w-full max-w-7xl mx-auto">
        <h3 className="my-10 text-2xl font-medium">
          Hello {currentUser?.first_name}, Welcome
        </h3>
        <div className="flex flex-col gap-4 md:flex-row md:gap-6">
            {classInfo?.map(classData => {
                return (
                  <div key={classData.class_id} className="flex ">
                    <div className="flex flex-col gap-1 px-4 md:px-6 py-6 rounded-lg bg-light-orange transition ">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex flex-col">
                          <h3 className="text-2xl font-medium">
                            {classData?.class_name}
                          </h3>
                          <h4 className="text-2l ">
                            {classData?.class_start} - {classData?.class_end}{' '}
                          </h4>
                        </div>
                        <div className="text-sm mt-4">
                          {' '}
                          <div>
                            {' '}
                            <span style={{ color: 'orange', fontSize: '1.3em' }}>
                              {classData?.days_remaining}
                            </span>{' '}
                            Days
                          </div>{' '}
                          Remaining
                        </div>
                      </div>
                      <div className="mb-5">
                        <div className="flex justify-between items-center">
                          <div className="text-lg mr-4">Attendance</div>
                          <div className="text-lg mr-4">Present</div>
                          <div className="text-lg mr-4">Absent</div>
                          <div className="text-lg mr-4">Late</div>
                        </div>
                        <div className="flex justify-between items-center">
                          <h4 className="text-2l font-medium mr-4">50%</h4>
                          <h4 className="text-2l font-medium ml-2">
                            {classData?.present_days}
                          </h4>
                          <h4 className="text-2l font-medium mr-2">
                            {classData?.absent_days}
                          </h4>
                          <h4 className="text-2l font-medium mr-6">
                            {classData?.late_days}
                          </h4>
                        </div>
                      </div>
                      <button
                        onClick={() => handleCheckIn(classData.class_id)}
                        className="btn py-2 self-end mr-4">
                        Check in
                      </button>
                    </div>
                  </div>
                )
            })}
        </div>

        <div className="my-10">
          <h3 className="font-medium text-2xl ">Generate Report</h3>
          <input
            type="text"
            placeholder="Select period"
            className="mt-4 rounded-md"
          />
          <div>
            <button className="btn py-2 mt-4 ">Download</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardStudent;
