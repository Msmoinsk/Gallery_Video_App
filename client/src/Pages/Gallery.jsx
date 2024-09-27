import React from 'react'
import CommonPage from '../Layouts/CommonPage'
import UploadBtn from '../Components/Upload/Uploadmodal'
import '../Styles/gallery.css'

const Gallery = () => {
  return (
    <div className='gallery'>
      <UploadBtn />
    </div>
  )
}

export default CommonPage(Gallery)
