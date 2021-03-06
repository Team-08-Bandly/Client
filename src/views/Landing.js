import React, { useEffect } from 'react'

import BandCard from '../components/bandCard'

import { Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { fetchBands, fetchUser } from '../store/actions'

function Landing () {
  const bands = useSelector(state => state.bands.bands)
  const dispatch = useDispatch()
  const { accountType } = useSelector(state => state.userData)
  const loginStatus = useSelector(state => state.loginStatus.isLoggedIn)

  useEffect(() => {
    dispatch(fetchBands())
    if (loginStatus) {
      dispatch(fetchUser())
    }
  }, [dispatch, loginStatus])

  let randomBands = bands?.bands?.sort(() => 0.5 - Math.random()).slice(0, 6)

  return (
    <div className='relative overflow-hidden pb-8'>
      <main className='mt-16 mx-auto max-w-7xl px-4 sm:mt-24'>
        <div className='text-center'>
          <h1 className='text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl'>
            <span className='block xl:inline'>
              {accountType === 'client' ? 'You deserve' : "Let's improve"}
            </span>
            <span className='block text-indigo-600 xl:inline'>
              {accountType === 'client' ? ' the best' : ' your band'}
            </span>
          </h1>
          <p className='mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl'>
            {accountType === 'client'
              ? 'Find The Perfect Performer For Your Best Event'
              : 'Take inspiration from another performer'}
          </p>
          <div className='mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8'>
            <div className='rounded-md shadow'>
              <Link to='/bands'>
                <span className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10'>
                  Browse Performer
                </span>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <div className='mx-auto container mt-32'>
        <div class='mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none'>
          {randomBands?.map(band => {
            return (
              <div
                key={band.id}
                className='flex flex-col rounded-lg shadow-lg overflow-hidden'
              >
                <BandCard data={band} />
              </div>
            )
          })}
        </div>
      </div>
      <div className='text-center'>
        <br />
        <h2 className='text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl'>
          And many more...
        </h2>
      </div>
    </div>
  )
}

export default Landing
