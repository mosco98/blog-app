import React, { useState } from 'react'
import axios from 'axios'
import storage from '../../utils/Storage'

const SERVER = 'https://blog-app-moscode.herokuapp.com'

const EditPostForm = ({ updateShowModal, title, body, id, SelectPostHandler }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newBody, setNewBody] = useState('')

  function EditPostHandler(e) {
    e.preventDefault()

    axios
      .post(
        `${SERVER}/posts/${id}/edit`,
        { title: newTitle === '' ? title : newTitle, body: newBody === '' ? body : newBody },
        {
          headers: {
            Authorization: `Bearer ${storage.getToken()}`
          }
        }
      )
      .then(({ data }) => {
        if (data.success) {
          SelectPostHandler(id)
          updateShowModal(false)
        }
      })
      .catch((err) => console.log(err))
  }
  return (
    <div className="flex items-center justify-center w-full h-screen fixed" style={{ zIndex: '20' }}>
      <div className="over-lay" onClick={() => updateShowModal(false)} />

      <form className="add-form shadow-sm p-4 rounded" onSubmit={EditPostHandler}>
        <h1 className="text-center mb-1 text-2xl font-bold">Edit Post</h1>
        <div className="mb-4 flex flex-col">
          <label>Title</label>
          <input
            type="text"
            className="p-3 bg-gray-400 my-1"
            onChange={(e) => setNewTitle(e.target.value)}
            autoFocus={true}
            defaultValue={title}
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label>Body</label>
          <textarea
            className="p-3 bg-gray-400 my-1"
            onChange={(e) => setNewBody(e.target.value)}
            defaultValue={body}></textarea>
        </div>
        <button className="mx-3 my-2 p-2 bg-green-400 cursor-pointer text-white">Save</button>
      </form>
    </div>
  )
}

export default EditPostForm
