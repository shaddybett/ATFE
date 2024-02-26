import React from 'react'
import { Link } from 'react-router-dom'

function StudentDashboard() {
  return (
    <div className='flex gap-4 p-4'>
      <Link to='login'>login</Link>
      <Link to='admin'>admin</Link>
      <Link to='students'>students</Link>
      <Link to='teacher'>teacher</Link>
      <Link to='class'>class</Link>
    </div>
  )
}

export default StudentDashboard
