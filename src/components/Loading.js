import React from 'react'

function Loading() {
  return (
    <div
      className="absolute top-0 left-0 h-full min-h-full w-full z-[100] bg-light flex justify-center items-center px-4 py-6"
      id="add-class">
      <div className="border-t-4 border-m-orange w-8 rounded-full animate-spin h-8  "></div>
    </div>
  )
}

export default Loading
