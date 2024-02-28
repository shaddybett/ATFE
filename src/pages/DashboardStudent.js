import React from "react";
import Nav from "../components/Nav";
import { Link } from "react-router-dom";


function DashboardStudent() {
  return (
    <div>
      <Nav />
      <Link to="/students" className="block w-full max-w-[500px]">
        <div className="flex flex-col gap-4 items-center px-4 pb-4 pt-14 rounded-lg bg-light-orange hover:bg-t-orange transition">
          <h3 className="text-4xl ">Class name</h3>
          <h4 className="text-2xl ">8:00 AM - 10:00AM</h4>
          <h2 className="text-2xl font-medium">Attendance Recap</h2>
          <div className="flex justify-between w-full">
            <div className="text-lg">
              Present: 6 | Absent: 5 | Remaining: 20
            </div>
            <div className="text-lg">Attendance %: 50%</div>
          </div>
        </div>
      </Link>

      <h3>Generate Report</h3>
      <input type="text" placeholder="Select period" />
      <button placeholder="Download"></button>
      <button className="btn py-2">Download</button>


    </div>
  );
}

export default DashboardStudent;
