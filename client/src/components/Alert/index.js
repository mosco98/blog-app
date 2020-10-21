import React from 'react'

const Alert = ({ errMsg, error, success, successMsg }) => {
  return (
    <>
      {error && <small className="fixed top-0 p-2 bg-red-500 text-white">{errMsg}</small>}
      {success && <small className="fixed top-0 p-2 bg-green-500 text-white">{successMsg}</small>}
    </>
  )
}

export default Alert
