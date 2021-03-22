import React, { useEffect, useState } from 'react'
import BandCard from '../components/bandCard'
import { useSelector, useDispatch } from 'react-redux'
import { fetchBands } from '../store/actions'
import useListGenre from '../hooks/genreHooks'

function Band () {
  const bands = useSelector(state => state.bands.bands)
  const dispatch = useDispatch()
  const [filteredBands, setFilteredBands] = useState([])

  function filterBands (payload) {
    if (payload === 'all') {
      setFilteredBands(bands.bands)
    } else {
      let filterResult = bands.bands.filter(band => {
        if (band.Genres.some(genre => genre.name === payload)) {
          return band
        }
      })
      setFilteredBands(filterResult)
    }
  }

  useEffect(() => {
    dispatch(fetchBands())
  }, [dispatch])

  useEffect(() => {
    setFilteredBands(bands.bands)
  }, [bands])

  const genres = useListGenre()

  return (
    <div className='container mx-auto px-4 mt-12'>
      <div className='flex divide-x'>
        <div className='flex w-1/6'>
          <ul className='space-y-1 sticky top-4'>
            <li
              className='text-gray-900 flex items-center px-3 py-2 text-md font-medium rounded-md cursor-pointer'
              aria-current='page'
              onClick={() => filterBands('all')}
            >
              <span className='truncate'>all</span>
            </li>
            {genres?.map((genre, index) => {
              return (
                <li
                  key={genre.id}
                  className='text-gray-900 flex items-center px-3 py-2 text-md font-medium rounded-md cursor-pointer'
                  aria-current='page'
                  onClick={() => filterBands(genre.label)}
                >
                  <span key={index} className='truncate'>
                    {genre.label}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>

        <div className='flex w-5/6'>
          <div className='max-w-lg mx-auto px-4 grid gap-5 lg:grid-cols-3 lg:max-w-none'>
            {filteredBands?.map((band, index) => {
              return (
                <div
                  key={index}
                  className='flex flex-col rounded-lg shadow-lg overflow-hidden'
                >
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
