import React from 'react'
import Nav from '../components/Nav'
import alarm from '../assets/images/alarm-sharp.svg'
import present from '../assets/images/person-add-sharp.svg'
import absent from '../assets/images/person-remove-sharp.svg'
import people from '../assets/images/people-sharp.svg'

function ClassDetail() {
  return (
    <div>
      <Nav />
      <main className="w-full max-w-7xl mx-auto px-4 py-6 ">
        <h1 className='text-3xl'>Programming with python</h1>
        <section>
            <div className='flex'>
                <div className='flex items-center gap-6 px-6 py-4 bg-light-orange'>
                    <img className='w-10 h-10' src={people} alt="icon" />
                    <div>
                        <span className='block'>47</span>
                        <span>Total Students</span>
                    </div>
                </div>
            </div>
        </section>
      </main>
    </div>
  )
}

export default ClassDetail
