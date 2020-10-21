import axios from 'axios'
import React, { useState } from 'react'

import storage from '../../utils/Storage'

const SERVER = 'https://blog-app-moscode.herokuapp.com'

const AddPostForm = ({ updateShowModal }) => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  function SubmitForm(e) {
    e.preventDefault()

    axios
      .post(
        `${SERVER}/posts/add`,
        { title, body },
        {
          headers: {
            Authorization: `Bearer ${storage.getToken()}`
          }
        }
      )
      .then(({ data }) => {
        if (data.success) {
          updateShowModal(false)
        }
      })
      .catch((err) => console.log(err))
  }
  return (
    <div className="flex items-center justify-center w-full h-screen fixed" style={{ zIndex: '20' }}>
      <div className="over-lay" onClick={() => updateShowModal(false)} />

      <form className="add-form shadow-sm p-6 rounded" onSubmit={SubmitForm}>
        <h1 className="text-center mb-1 text-2xl font-bold">New Post</h1>
        <div className="mb-4 flex flex-col w-full">
          <label>Title</label>
          <input
            type="text"
            className="p-3 bg-gray-400 my-1"
            onChange={(e) => setTitle(e.target.value)}
            autoFocus={true}
          />
        </div>
        <div className="mb-4 flex flex-col w-full">
          <label>Body</label>
          <textarea className="p-3 bg-gray-400 my-1" onChange={(e) => setBody(e.target.value)}></textarea>
        </div>
        <button className=" p-2 bg-green-400 cursor-pointer text-white">Add post</button>
      </form>
    </div>
  )
}

export default AddPostForm
