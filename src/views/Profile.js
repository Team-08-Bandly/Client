import React, { useEffect } from 'react'
import Badge from '../components/badge'
import PortoCard from '../components/portocard'
import { useSelector, useDispatch } from 'react-redux'
import { fetchBand } from '../store/actions'

import { Link, useParams } from 'react-router-dom'

function Profile () {
  const loginStatus = useSelector(state => state.loginStatus.isLoggedIn)
  const band = useSelector(state => state.bands.band)
  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(() => {
    dispatch(fetchBand(id))
  }, [dispatch, id])

  const porto = [
    {
      PortofolioType: 'image',
      fileUrl: 'https://www.nme.com/wp-content/uploads/2020/09/nirvanalogo.jpg'
    },
    {
      PortofolioType: 'image',
      fileUrl: 'https://www.nme.com/wp-content/uploads/2020/09/nirvanalogo.jpg'
    },
    {
      PortofolioType: 'image',
      fileUrl: 'https://www.nme.com/wp-content/uploads/2020/09/nirvanalogo.jpg'
    },
    {
      PortofolioType: 'image',
      fileUrl: 'https://www.nme.com/wp-content/uploads/2020/09/nirvanalogo.jpg'
    },
    {
      PortofolioType: 'image',
      fileUrl: 'https://www.nme.com/wp-content/uploads/2020/09/nirvanalogo.jpg'
    },
    {
      PortofolioType: 'image',
      fileUrl: 'https://www.nme.com/wp-content/uploads/2020/09/nirvanalogo.jpg'
    },
    {
      PortofolioType: 'image',
      fileUrl: 'https://www.nme.com/wp-content/uploads/2020/09/nirvanalogo.jpg'
    },
    {
      PortofolioType: 'image',
      fileUrl: 'https://www.nme.com/wp-content/uploads/2020/09/nirvanalogo.jpg'
    },
    {
      PortofolioType: 'image',
      fileUrl: 'https://www.nme.com/wp-content/uploads/2020/09/nirvanalogo.jpg'
    }
  ]

  const reviews = [
    {
      id: 1
    },
    {
      id: 3
    },
    {
      id: 2
    }
  ]
  return (
    <div className='relative max-w-7xl mx-auto justify-between px-4 sm:px-6'>
      <div className='flex w-full mb-4 rounded justify-center h-100'>
        <img
          src={band?.coverUrl}
          className='object-cover rounded-lg h-100 w-full'
          alt=''
        />
      </div>
      <div className='flex flex-wrap md:flex-nowrap'>
        <div className='flex items-start w-full md:w-1/3'>
          <div className='bg-white overflow-hidden shadow rounded-lg sticky top-4'>
            <div className='px-4 py-5 sm:p-6'>
              <div className='aspect-w-32 aspect-h-32'>
                <img
                  className='object-cover shadow-lg rounded-lg'
                  src={band?.imageUrl}
                  alt=''
                />
              </div>
              <div className='text-lg leading-6 font-medium mt-8 mb-4'>
                <h3>{band?.name}</h3>
              </div>
              <dd className='mt-1 text-md text-gray-900 sm:mt-0 sm:col-span-2 leading-7 mb-4'>
                <p>{band?.description}</p>
              </dd>
              {band?.Genres?.map(genre => {
                return <Badge key={genre?.id} text={genre?.name} />
              })}
              <p className='text-sm text-gray-800 mt-4'>
                Rate :{' '}
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR'
                }).format(band?.rate)}{' '}
                / hour
              </p>

              <Link
                to={loginStatus ? '/order/1' : '/login'}
                className='w-full justify-center mt-4 inline-flex px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                Make an Appointment
              </Link>
            </div>
          </div>
        </div>
        <div className='flex items-start flex-wrap mt-4 md:mt-0 w-full md:w-2/3 md:ml-4 justify-center mx-auto'>
          {porto.map(portofolio => {
            return (
              <div className='md:w-1/3 w-full px-0 md:px-1 mb-4 rounded-lg shadow-lg overflow-hidden'>
                <PortoCard />
              </div>
            )
          })}
          <div className='relative'>
            <div
              className='absolute inset-0 flex items-center'
              aria-hidden='true'
            >
              <div className='w-full border-1 border-red-900'></div>
            </div>
            <div className='relative flex justify-center'>
              <span className='px-3 bg-gray-50 text-lg font-medium text-gray-900'>
                Review & Rating
              </span>
            </div>
          </div>
          <div className='bg-white shadow rounded-lg mt-4'>
            <div className='px-4 py-4'>
              <ul className='divide-y divide-gray-200'>
                {reviews.map(review => {
                  return (
                    <li className='py-4'>
                      <div className='flex'>
                        <div className='mr-4 flex-shrink-0'>
                          <svg
                            className='h-16 w-16 border border-gray-300 bg-white text-gray-300'
                            preserveAspectRatio='none'
                            stroke='currentColor'
                            fill='none'
                            viewBox='0 0 200 200'
                            aria-hidden='true'
                          >
                            <path
                              vectorEffect='non-scaling-stroke'
                              strokeWidth='1'
                              d='M0 0l200 200M0 200L200 0'
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className='text-lg font-bold'>Lorem ipsum</h4>
                          <p className='mt-1'>
                            Repudiandae sint consequuntur vel. Amet ut nobis
                            explicabo numquam expedita quia omnis voluptatem.
                            Minus quidem ipsam quia iusto.
                          </p>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
