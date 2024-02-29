import React, { useContext, useEffect, useState } from "react";
import Nav from "../components/Nav";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const reportUrl = "http://127.0.0.1:5000/student";

function DashboardStudent() {
  const { currentUser } = useContext(UserContext);
  const [classInfo, setClassInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(reportUrl, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('authToken')}`, // Corrected interpolation
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setClassInfo(data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentUser]); 

  return (
    <div>
      <Nav />
      <h3 className="mb-4 mt-4 font-medium ml-10">
        Hello {currentUser?.first_name}, Welcome
      </h3>
      <div className="flex ml-10">
        <Link to="/currentUser" className="block max-w-[500px]"></Link>
        
        <div className="flex flex-col gap-1 px-4 md:px-6 py-6 rounded-lg bg-light-orange hover:bg-t-orange transition ">
          <div className="flex justify-between items-center mb-2">
            <div className="flex flex-col">
              <h3 className="text-2xl font-medium">{classInfo?.class_name} Class</h3>
              <h4 className="text-2l ">{classInfo?.class_start}  - {classInfo?.class_end} </h4>
            </div>
            <div className="text-sm mt-4">
              {" "}
              <div>
                {" "}
                <span style={{ color: "orange", fontSize: "1.3em" }}>
                {classInfo?.days_remaining}
                </span>{" "}
                Days
              </div>{" "}
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
              <h4 className="text-2l font-medium ml-2">{classInfo?.present_days}</h4>
              <h4 className="text-2l font-medium mr-2">{classInfo?.absent_days}</h4>
              <h4 className="text-2l font-medium mr-6">{classInfo?.late_days}</h4>
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
          className="mt-4 rounded-md"
        />
        <div>
          <button className="btn py-2 mt-4 ">Download</button>
        </div>
      </div>
    </div>
  );
}

export default DashboardStudent;
