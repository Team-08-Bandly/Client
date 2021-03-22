import React, { useEffect } from 'react'
import BandCard from '../components/bandCard'
import { useSelector, useDispatch } from 'react-redux'
import { fetchBands } from '../store/actions'

function Band () {
  const bands = useSelector(state => state.bands.bands)
  const dispatch = useDispatch()

  console.log(bands)

  useEffect(() => {
    dispatch(fetchBands())
  }, [dispatch])

  const genres = [
    {
      id: '1',
      name: 'Pop'
    },
    {
      id: '1',
      name: 'Rock'
    },
    {
      id: '1',
      name: 'R&B'
    },
    {
      id: '1',
      name: 'Jazz'
    },
    {
      id: '1',
      name: 'Dangdut'
    }
  ]

  return (
    <div className='container mx-auto px-4 mt-12'>
      <div className='flex divide-x'>
        <div className='flex w-1/6'>
          <ul className='space-y-1 sticky top-4'>
            {genres.map(genre => {
              return (
                <li
                  href='#'
                  class='text-gray-900 flex items-center px-3 py-2 text-md font-medium rounded-md'
                  aria-current='page'
                >
                  <span className='truncate'>{genre.name}</span>
                </li>
              )
            })}
          </ul>
        </div>

        <div className='flex w-5/6'>
          <div className='max-w-lg mx-auto px-4 grid gap-5 lg:grid-cols-3 lg:max-w-none'>
            {bands?.bands?.map((band, index) => {
              return (
                <div className='flex flex-col rounded-lg shadow-lg overflow-hidden'>
                  <BandCard key={band.id} data={band} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Band
