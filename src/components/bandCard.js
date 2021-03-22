import React from 'react'
import { Link } from 'react-router-dom'

function BandCard ({ data }) {
  return (
    <div>
      <div className='flex-shrink-0'>
        <img
          className='h-64 w-full object-cover object-top'
          src={data?.imageUrl}
          alt={data?.name}
        />
      </div>
      <div className='flex-1 bg-white p-6 flex flex-col justify-between'>
        <div className='flex-1'>
          <p className='text-sm font-medium text-indigo-600'>
            {data?.Genres?.map(genre => {
              return (
                <a key={genre?.id} className='mx-1'>
                  {genre?.name}
                </a>
              )
            })}
          </p>
          <Link to={`/profile/${data?.id}`} className='block mt-2'>
            <p className='text-xl font-semibold text-gray-900'>{data?.name}</p>
          </Link>
          <p className='mt-3 text-base text-gray-500'>{data?.description}</p>
        </div>
      </div>
    </div>
  )
}

export default BandCard
