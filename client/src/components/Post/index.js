import React, { useState } from 'react'
import { Trash2, Edit2 } from 'react-feather'
import axios from 'axios'
import storage from '../../utils/Storage'
import EditPostForm from '../EditPostForm'

const SERVER = 'http://localhost:8080'

const Post = ({ updateViewPost, selectedPost, SelectPostHandler }) => {
  const [showModal, updateShowModal] = useState(false)
  const { _id, title, body } = selectedPost

  function DeletePostHandler(id) {
    axios
      .delete(`${SERVER}/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${storage.getToken()}`
        }
      })
      .then(({ data }) => {
        if (data.success) {
          updateViewPost(false)
        }
      })
      .catch((err) => console.log(err))
  }
  return (
    <>
      {showModal ? (
        <EditPostForm
          updateShowModal={updateShowModal}
          title={title}
          body={body}
          id={_id}
          SelectPostHandler={SelectPostHandler}
        />
      ) : (
        <div
          className="flex items-center justify-center w-full h-screen fixed overflow-y-scroll h-auto"
          style={{ zIndex: '20' }}>
          <div className="over-lay" onClick={() => updateViewPost(false)} />
          <div className="post p-4 text-center shadow-sm rounded flex items-center justify-between">
            <div style={{ width: '95%' }}>
              <h1 className="text-2xl font-bold text-center">{title}</h1>
              <p>{body}</p>
            </div>
            <span className="flex flex-col items-center justify-center" style={{ width: '5%' }}>
              <Trash2 className="my-2 cursor-pointer" onClick={() => DeletePostHandler(_id)} />
              <Edit2 className="my-2 cursor-pointer" onClick={() => updateShowModal(true)} />
            </span>
          </div>
        </div>
      )}
    </>
  )
}

export default Post
