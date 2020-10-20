import React from 'react'

const PostLink = ({ _id, title, body, SelectPostHandler }) => {
  return (
    <>
      <li
        className="p-3 flex flex-col items-center justify-around shadow-inner bg-red-100 my-3 cursor-pointer"
        onClick={() => SelectPostHandler(_id)}>
        <h1 className="text-2xl font-bold">{title}</h1>
        <span className="truncate">{body}</span>
        <small>Created on - </small>
      </li>
    </>
  )
}

export default PostLink
