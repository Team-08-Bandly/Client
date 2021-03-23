import React, { useState, useEffect } from 'react'

import LightboxPorto from '../components/lightboxPorto'

import VideoThumbnail from 'react-video-thumbnail'; // use npm published version

function PortoCard (props) {

  const [ isShow, setIsShow ] = useState(false);

  return (
    <div>
      { isShow ? <LightboxPorto fileUrl={props.portofolio.fileUrl} closeModal={ () => { setIsShow(false) } }/> : ''}
      <div className='space-y-4' onClick={() => { setIsShow(true) }} >
        <div className='aspect-w-32 aspect-h-32'>
        <VideoThumbnail
          videoUrl={props.portofolio.fileUrl}
          className="w-full"
        />
        </div>
      </div>
    </div>
  )
}

export default PortoCard
