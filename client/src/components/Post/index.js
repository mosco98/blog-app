import axios from 'axios'
import React, { useState } from 'react'
import { Edit2, Trash2 } from 'react-feather'

import storage from '../../utils/Storage'
import EditPostForm from '../EditPostForm'

const SERVER = 'https://blog-app-moscode.herokuapp.com'

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
          <div className="post p-5 shadow-sm rounded flex flex-col items-center justify-center">
            <div>
              <h1 className="text-1xl font-bold text-center">{title}</h1>
              <small className="text-left" style={{ fontSize: '15px' }}>
                {body}
              </small>
            </div>
            <span className="self-end flex">
              <Trash2
                className="my-3 mx-1 cursor-pointer"
                color="red"
                size="19"
                onClick={() => DeletePostHandler(_id)}
              />
              <Edit2
                className="my-3 mx-1 cursor-pointer"
                color="blue"
                size="19"
                onClick={() => updateShowModal(true)}
              />
            </span>
          </div>
        </div>
      )}
    </>
  )
}

export default Post
