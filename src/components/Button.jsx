import React from 'react'

const Button = ({children, onClick}) => {
  return (
    <button className={`text-black bg-white font-bold text-lg w-24 h-12 rounded-lg shadow-md mr-2`}
    onClick={onClick}>
        {children}
        </button>
  )
}

export default Button