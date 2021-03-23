import React, { useState, useEffect } from 'react'

import LightboxPorto from '../components/lightboxPorto'

function PortoCard (props) {

  const [ isShow, setIsShow ] = useState(false);

  return (
    <div>
      { isShow ? <LightboxPorto fileUrl={props.portofolio.fileUrl} closeModal={ () => { setIsShow(false) } }/> : ''}
      <div className='space-y-4'>
        <div className='aspect-w-32 aspect-h-32'>
          <img
            onClick={() => { setIsShow(true) }}
            className='object-cover shadow-lg rounded-lg'
            src='https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixqx=59P1dilf32&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80'
            alt=''
          />
        </div>
      </div>
    </div>
  )
}

export default PortoCard
