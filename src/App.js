import { Routes, Route } from 'react-router-dom'
import StudentDashboard from './pages/StudentDashboard'
import AdminDashboard from './pages/AdminDashboard'
import StudentsPage from './pages/StudentsPage'
import Login from './pages/Login'
import TeacherDashboard from './pages/TeacherDashboard'
import ClassDetail from './pages/ClassDetail'
import EditTeacher from './pages/EditTeacher'
import EditStudent from './pages/EditStudent'

function App() {
  return (
    <Routes>
        <Route path='/' element={<StudentDashboard />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/teacher' element={<TeacherDashboard />} />
        <Route path='/students' element={<StudentsPage/>} />
        <Route path='/class' element={<ClassDetail/>} />
        <Route path='/editteacher' element={<EditTeacher/>}/>
        <Route path='/editstudent' element={<EditStudent/>}/>
    </Routes>
  )
}

export default App
