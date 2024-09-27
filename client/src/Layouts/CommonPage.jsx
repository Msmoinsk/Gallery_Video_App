import React from 'react'
import NavigationBar from '../Components/NavBar/Navbar'

const CommonPage = (Component) => ({...props}) => {
  return (
    <>
      <NavigationBar />
      <Component {...props} />
      <footer>Footer</footer>
    </>
  )
}

export default CommonPage
