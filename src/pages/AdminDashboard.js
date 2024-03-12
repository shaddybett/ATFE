import React, { useContext, useState, useCallback } from 'react'
import Nav from '../components/Nav'
import CreateTeacher from './CreateTeacher'
import EditTeacher from './EditTeacher'
import Loading from '../components/Loading'
import grad from '../assets/images/grad.svg'
import chevRight from '../assets/images/chevron-forward-outline.svg'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import TeachersTable from '../components/TeachersTable'


function AdminDashboard() {
    const [showForm, setShowForm] = useState(false)
    const [showEditTeacherForm, setShowEditTeacherForm] = useState(false)
    const [selectedTeacher, setSelectedTeacher] = useState({})
    const { loading} = useContext(UserContext)

    const handleClick = useCallback(() => {
        setShowForm(!showForm)
    },[showForm])

    const handleEditTeacher = useCallback((teacher)=>{
        setShowEditTeacherForm(!showEditTeacherForm)
        setSelectedTeacher(teacher)
    },[showEditTeacherForm])
    
    if (!sessionStorage.getItem('authToken')) {
      return
    }

    return (
      <div className={(loading || showForm || showEditTeacherForm) ? 'overflow-hidden h-full max-h-[100vh]' :''}>
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
          <div className="cards-container">
            <Link to="/students" className="block w-full max-w-[350px]">
              <div className="flex gap-4 items-center px-4 pb-4 pt-10 rounded-lg bg-light-orange hover:bg-t-orange transition">
                <img className="w-12 " src={grad} alt="icon" />
                <div className="flex justify-between w-full items-end">
                  <h3 className="text-3xl font-medium">Students</h3>
                  <img className="w-7 h-7" src={chevRight} alt="icon" />
                </div>
              </div>
            </Link>
            <Link to="." className="block w-full max-w-[350px]">
              <div className="flex gap-4 items-center px-4 pb-4 pt-10 rounded-lg bg-light-orange hover:bg-t-orange transition">
                {/* <img className="w-12 h-12" src={grad} alt="icon" /> */}
                <div className="flex justify-between w-full items-end">
                  <h3 className="text-3xl font-medium">Departments</h3>
                  <img className="w-7 h-7" src={chevRight} alt="icon" />
                </div>
              </div>
            </Link>
            <Link to="." className="block w-full max-w-[350px]">
              <div className="flex gap-4 items-center px-4 pb-4 pt-10 rounded-lg bg-light-orange hover:bg-t-orange transition">
                {/* <img className="w-12 h-12" src={grad} alt="icon" /> */}
                <div className="flex justify-between w-full items-end">
                  <h3 className="text-3xl font-medium">Courses</h3>
                  <img className="w-7 h-7" src={chevRight} alt="icon" />
                </div>
              </div>
            </Link>
            <Link to="." className="block w-full max-w-[350px]">
              <div className="flex gap-4 items-center px-4 pb-4 pt-10 rounded-lg bg-light-orange hover:bg-t-orange transition">
                {/* <img className="w-12 h-12" src={grad} alt="icon" /> */}
                <div className="flex justify-between w-full items-end">
                  <h3 className="text-3xl font-medium">Roles</h3>
                  <img className="w-7 h-7" src={chevRight} alt="icon" />
                </div>
              </div>
            </Link>
          </div>
          <TeachersTable handleClick={handleClick} handleEditTeacher={handleEditTeacher}/>
        </main>
      </div>
    )
}

export default AdminDashboard



