import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import grad from '../assets/images/grad.svg'
import chevRight from '../assets/images/chevron-forward-outline.svg'
import ellipsis from '../assets/images/ellipsis-vertical.svg'
import trash from '../assets/images/trash-bin.svg'
import pencil from '../assets/images/pencil.svg'
import { Link } from 'react-router-dom'
import { ListGroup } from 'flowbite-react'
import CreateClass from './CreateClass'

function TeacherDashboard() {
  const [hoveredCard, setHoveredCard] = useState(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (hoveredCard !== null && !event.target.closest('.class-card')) {
        setHoveredCard(null) 
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [hoveredCard])

  function handleClose() {
    setShowForm(!showForm)
  }
  function handleClick(index) {
    setHoveredCard(hoveredCard === index ? null : index)
  }

  return (
    <div>
      <Nav />
      {showForm && (
        <CreateClass handleClose={handleClose} setShowForm={setShowForm} />
      )}
      <section
        onClick={() => handleClick(null)}
        className="w-full max-w-7xl mx-auto px-4 py-12 ">
        <Link to="/students" className="block w-full max-w-[350px]">
          <div className="flex gap-4 items-center px-4 pb-4 pt-14 rounded-lg bg-light-orange hover:bg-t-orange transition">
            <img className="w-12 h-12" src={grad} alt="icon" />
            <div className="flex justify-between w-full items-end">
              <h3 className="text-4xl font-semibold">Students</h3>
              <img className="w-7 h-7" src={chevRight} alt="icon" />
            </div>
          </div>
        </Link>
      </section>
      <section className="w-full max-w-7xl mx-auto px-4 py-4">
        <div className="flex w-full justify-between border-b border-neutral-300 mb-6 pb-2">
          <h3 className="text-2xl font-medium">Your classes</h3>
          <button className="btn py-1" onClick={handleClose}>
            + New
          </button>
        </div>
        <div className="flex flex-col gap-6 py-6">
          {Array.from([1, 2, 3]).map((index, el) => {
            return (
              <div
                key={index}
                // onClick={() => handleClick(null)}
                className="class-card relative flex justify-between gap-6 items-end w-full max-w-xl bg-light-orange hover:bg-t-orange transition px-4 pt-10 pb-2 rounded-lg">
                <div>
                  <h4 className="font-semibold text-2xl">
                    Lorem ipsum dolor sit amet.
                  </h4>
                  <p>8:00 AM - 10:00 AM</p>
                </div>
                <div>
                  <span className="block font-bold text-m-orange">47</span>
                  <span>Students</span>
                </div>
                <button
                  className="absolute z-40 top-4 right-4 p-1 border border-transparent hover:border-orange-300 rounded-full transition"
                  aria-label="class options"
                  onClick={() => handleClick(index)}>
                  <img className="w-4 h-4" src={ellipsis} alt="icon" />
                </button>
                <ListGroup
                  className={`list-group ${
                    hoveredCard === index ? 'opacity-100' : 'opacity-0'
                  }`}>
                  <ListGroup.Item>
                    <img src={pencil} alt="icon" className="w-3 h-3 mr-2" />
                    Edit
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <img src={trash} alt="icon" className="w-3 h-3 mr-2" />
                    Delete
                  </ListGroup.Item>
                </ListGroup>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

export default TeacherDashboard
