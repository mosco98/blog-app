import React from 'react'

const name = 'mos{code}'

const Footer = () => {
  return (
    <footer>
      <small className="m-2">
        Made by with{' '}
        <span role="img" aria-label="love">
          ❤️
        </span>{' '}
        <a href="https://moscode.netlify.app" target="_blank" rel="noopener noreferrer">
          {name}
        </a>
      </small>
    </footer>
  )
}

export default Footer
