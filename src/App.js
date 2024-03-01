import { Routes, Route } from 'react-router-dom'
import StudentDashboard from './pages/StudentDashboard'
import AdminDashboard from './pages/AdminDashboard'
import StudentsPage from './pages/StudentsPage'
import Login from './pages/Login'
import TeacherDashboard from './pages/TeacherDashboard'
import ClassDetail from './pages/ClassDetail'
import EditTeacher from './pages/EditTeacher'
import EditStudent from './pages/EditStudent'
import UserProfile from './pages/UserProfile'
import AllClasses from './pages/AllClasses'
import UpdateUserProfile from './pages/UpdateUserProfile'
import DashboardStudent from './pages/DashboardStudent'
import EditClass from './pages/EditClass'
import Attendance from './pages/Attendance'
import { ClassProvider } from './context/ClassContext';
import UserProvider from './context/UserContext'

function App() {
  return (

    <ClassProvider>

      <UserProvider>
        
        <Routes>
              <Route path='/' element={<StudentDashboard />}/>
              <Route path='/login' element={<Login />} />
              <Route path='/admin' element={<AdminDashboard />} />
              <Route path='/teacher' element={<TeacherDashboard />} />
              <Route path='/students' element={<StudentsPage/>} />
              <Route path='/class/:id' element={<ClassDetail/>} />
              <Route path='/editclass' element={<EditClass/>}/>
              <Route path='/editteacher' element={<EditTeacher/>}/>
              <Route path='/editstudent' element={<EditStudent/>}/>
              <Route path='/profile' element={<UserProfile/>}/>
              <Route path='/allclasses' element={<AllClasses/>}/>
              <Route path='/attendance' element={<Attendance/>}/>
              <Route path='/updateuserprofile' element={<UpdateUserProfile/>}/>
              <Route path='/student' element={<DashboardStudent/>}/>
          </Routes>

      </UserProvider>

    </ClassProvider>
  )
}

export default App
