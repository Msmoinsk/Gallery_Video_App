import React from 'react'
import CommonPage from '../Layouts/CommonPage'
import UploadBtn from '../Components/Upload/Uploadmodal'
import ActionAreaCard from '../Components/UserDataShow/GetVideos'
import '../Styles/gallery.css'

const Videos = () => {
  return (
    <div className='gallery'>
      <UploadBtn urlClicked='video' />
      <ActionAreaCard />
    </div>
  )
}

export default CommonPage(Videos)
