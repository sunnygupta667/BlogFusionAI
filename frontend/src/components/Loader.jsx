import React from 'react'

const Loader = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-l-4 border-purple-600 border-solid"></div>
    </div>
  )
}

export default Loader