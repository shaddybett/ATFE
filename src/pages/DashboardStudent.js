import React from "react";
import Nav from "../components/Nav";
import { Link } from "react-router-dom";

function DashboardStudent() {
  return (
    <div>
      <Nav />
      <h3 className="mb-4 mt-4 font-medium ml-10">Welcome student name</h3>
      <div className="flex ml-10">
        <Link to="/students" className="block max-w-[500px]">
          <div className="mt-4 flex flex-col gap-1 px-4 pb-4 pt-14 rounded-lg bg-light-orange hover:bg-t-orange transition mb-4">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-medium mt-2">Class name</h3>
              <div className="text-lg mt-4">
                {" "}
                <div>
                  {" "}
                  <span style={{ color: "orange", fontSize: "1.3em" }}>
                    18
                  </span>{" "}
                  Days
                </div>{" "}
                Remaining
              </div>
            </div>
            <div className="mb-5">
              <h4 className="text-2l ">8:00 AM - 10:00 AM</h4>
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
            <button className="btn py-2 self-end mr-4 mt-4">Check in</button>
          </div>
        </Link>

        <Link to="/students" className="block max-w-[500px] ml-20">
          <div className="mt-4 flex flex-col gap-1 px-4 pb-4 pt-14 rounded-lg bg-light-orange hover:bg-t-orange transition mb-4">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-medium mt-2">Class name</h3>
              <div className="text-lg mt-4">
                {" "}
                <div>
                  {" "}
                  <span style={{ color: "orange", fontSize: "1.3em" }}>
                    18
                  </span>{" "}
                  Days
                </div>{" "}
                Remaining
              </div>
            </div>
            <div className="mb-5">
              <h4 className="text-2l ">8:00 AM - 10:00 AM</h4>

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
            <button className="btn py-2 self-end mr-4 mt-4">Check in</button>
          </div>
        </Link>
      </div>

      <div className="ml-10  mb-10" >
      <h3 className="font-medium text-2xl ">Generate Report</h3>
      <input type="text"  placeholder="Select period" className="mt-4 rounded-md  "/>
      <div>
      <button className="btn py-2 mt-4 ">Download</button>
      </div>
      </div>
    </div>
  );
}

export default DashboardStudent;
