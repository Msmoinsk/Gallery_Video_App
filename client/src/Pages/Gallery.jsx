import React from 'react'
import CommonPage from '../Layouts/CommonPage'
import UploadBtn from '../Components/Upload/Uploadmodal'
import GetImages from '../Components/UserDataShow/GetImages'

import '../Styles/gallery.css'

const Gallery = () => {
  return (
    <div className='gallery'>
      <UploadBtn />
      <GetImages />
    </div>
  )
}

export default CommonPage(Gallery)
