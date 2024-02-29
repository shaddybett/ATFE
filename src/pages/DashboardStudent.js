import React, { useContext } from "react";
import Nav from "../components/Nav";
import { UserContext } from "../context/UserContext";

function DashboardStudent() {
    const {currentUser} = useContext(UserContext)
  return (
    <div>
      <Nav />
      <div className="w-full max-w-7xl mx-auto px-4">
        <h3 className="my-8 font-medium text-2xl">Welcome {currentUser?.first_name}</h3>
        <div className="flex flex-col md:flex-row gap-6 w-full max-w-[360px]">
          <div className="flex flex-col gap-1 px-4 md:px-6 py-6 rounded-lg bg-light-orange hover:bg-t-orange transition">
            <div className="flex justify-between items-center mb-2">
              <div className="flex flex-col">
                <h3 className="text-2xl font-medium">Class name</h3>
                <h4 className="text-2l ">8:00 AM - 10:00 AM</h4>
              </div>
              <div className="text-sm">
                {' '}
                <div>
                  {' '}
                  <span style={{ color: 'orange', fontSize: '1.3em' }}>
                    18
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
                <h4 className="text-2l font-medium ml-2">5</h4>
                <h4 className="text-2l font-medium mr-2">10</h4>
                <h4 className="text-2l font-medium mr-6">20</h4>
              </div>
            </div>
            <button className="btn py-2 self-end mr-4">Check in</button>
          </div>
          <div className="flex flex-col gap-1 px-4 md:px-6 py-6 rounded-lg bg-light-orange hover:bg-t-orange transition">
            <div className="flex justify-between items-center mb-2">
              <div className="flex flex-col">
                <h3 className="text-2xl font-medium">Class name</h3>
                <h4 className="text-2l ">8:00 AM - 10:00 AM</h4>
              </div>
              <div className="text-sm mt-4">
                {' '}
                <div>
                  {' '}
                  <span style={{ color: 'orange', fontSize: '1.3em' }}>
                    18
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
                <h4 className="text-2l font-medium ml-2">5</h4>
                <h4 className="text-2l font-medium mr-2">10</h4>
                <h4 className="text-2l font-medium mr-6">20</h4>
              </div>
            </div>
            <button className="btn py-2 self-end mr-4">Check in</button>
          </div>
        </div>
        <div className="my-10">
          <h3 className="font-medium text-2xl ">Generate Report</h3>
          <input
            type="text"
            placeholder="Select period"
            className="mt-4 rounded-md  "
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
