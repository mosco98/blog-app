import React, { useEffect, useState } from 'react'
import { AddPostForm, NavBar, Post, PostLink } from '../../components'
import axios from 'axios'

import storage from '../../utils/Storage'

const SERVER = 'https://blog-app-moscode.herokuapp.com'

const Main = () => {
  const [posts, updatePosts] = useState([])
  const [userProfile, updateUserProfile] = useState({})
  const [showModal, updateShowModal] = useState(false)
  const [viewPost, updateViewPost] = useState(false)
  const [selectedPost, setSelectedPost] = useState({})
  function getPosts() {
    axios
      .get(`${SERVER}/posts`, { headers: { Authorization: `Bearer ${storage.getToken()}` } })
      .then(({ data }) => {
        if (data.success) {
          updatePosts(data.data)
        }
      })
      .catch((err) => console.log(err))
  }

  function getUser() {
    axios
      .get(`${SERVER}/user`, { headers: { Authorization: `Bearer ${storage.getToken()}` } })
      .then(({ data }) => {
        if (data.success) {
          updateUserProfile(data.data)
        }
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    getPosts()
  }, [posts])

  useEffect(() => {
    getUser()
  }, [])

  function SelectPostHandler(id) {
    axios
      .get(`${SERVER}/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${storage.getToken()}`
        }
      })
      .then(({ data }) => {
        if (data.success) {
          updateViewPost(true)
          setSelectedPost(data.data)
        }
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <NavBar userProfile={userProfile} updateShowModal={updateShowModal} />
      {showModal && <AddPostForm updateShowModal={updateShowModal} />}
      {posts.length ? (
        <ul className="absolute post-list-group">
          {posts.map((post, i) => (
            <PostLink key={i} {...post} SelectPostHandler={SelectPostHandler} />
          ))}
        </ul>
      ) : (
        <h1 className="text-2xl font-bold">No post available</h1>
      )}
      {viewPost && (
        <Post updateViewPost={updateViewPost} selectedPost={selectedPost} SelectPostHandler={SelectPostHandler} />
      )}
    </div>
  )
}

export default Main
