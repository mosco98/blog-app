import React from 'react'

const NavBar = ({ userProfile, updateShowModal }) => {
  return (
    <nav className="w-full p-5 flex items-center justify-end fixed top-0">
      <ul className="flex items-center justify-between">
        <li className="mx-1">Hi, {userProfile.name}</li>
        <li
          className="mx-1 bg-blue-400 text-white p-2 cursor-pointer shadow-sm rounded"
          onClick={() => updateShowModal(true)}>
          Add new post
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
