import React, { useEffect, useState } from 'react'
import Badge from '../components/badge'
import PortoCard from '../components/portocard'
import { useSelector, useDispatch } from 'react-redux'
import { fetchBand } from '../store/actions'
import axios from '../config/axios'
import ReactStars from 'react-stars'
import { Link, useHistory } from 'react-router-dom'
import Loader from '../components/loader'

function MyProfile () {
  const loginStatus = useSelector(state => state.loginStatus.isLoggedIn)
  const band = useSelector(state => state.bands.band)
  const { accountType } = useSelector(state => state.userData)
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const [showType, setShowType] = useState('video')
  const [userBandId, setUserBandId] = useState()
  const history = useHistory()

  // useEffect(() => {
  //   dispatch(fetchBand(userBandId))
  // }, [dispatch, userBandId])

  useEffect(() => {
    setIsLoading(false)
    // console.log(band)
  }, [band])

  useEffect(() => {
    if (accountType === 'band') {
      axios()
        .get('/bands/myProfile')
        .then(({ data }) => {
          if (data.band) {
            const { id } = data.band
            setUserBandId(id)
            dispatch(fetchBand(userBandId))
          } else {
            history.push('/profile')
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [accountType, userBandId])

  function RenderPorto () {
    if (showType === 'video') {
      return <Videos />
    } else if (showType === 'audio') {
      return <Audios />
    } else if (showType === 'youtube') {
      return <Youtube />
    }
  }

  function Videos () {
    if (band && band.Portofolios) {
      let portofolioVideo = band?.Portofolios.filter(
        portofolio =>
          portofolio.portofolioType === 'video' &&
          !portofolio.fileUrl.includes('youtube')
      )
      if (portofolioVideo.length > 0) {
        return portofolioVideo.map(portofolio => {
          return (
            <div className='md:w-1/3 w-full px-0 md:px-1 mb-4 rounded-lg shadow-lg overflow-hidden'>
              <PortoCard portofolio={portofolio} />
            </div>
          )
        })
      }
    }
    return <div></div>
  }

  function Audios () {
    if (band && band.Portofolios) {
      let portofolioAudio = band?.Portofolios.filter(
        portofolio => portofolio.portofolioType === 'audio'
      )
      if (portofolioAudio.length > 0) {
        return (
          <ul class='divide-y divide-gray-200 w-full'>
            {portofolioAudio.map(portofolio => {
              return (
                <li class='py-4 flex w-full'>
                  <div class='bg-white shadow overflow-hidden sm:rounded-md px-4 py-2 w-full'>
                    <audio controls className='w-full'>
                      <source src={portofolio.fileUrl} type='audio/ogg' />
                    </audio>
                  </div>
                </li>
              )
            })}
          </ul>
        )
      }
    }
    return <div></div>
  }

  function Youtube () {
    if (band && band.Portofolios) {
      let portofolioVideo = band?.Portofolios.filter(
        portofolio =>
          portofolio.portofolioType === 'video' &&
          portofolio.fileUrl.includes('youtube')
      )
      if (portofolioVideo.length > 0) {
        return portofolioVideo.map(portofolio => {
          const ID_REGEX = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
          return (
            <div className='w-full px-0 md:px-1 mb-4 rounded-lg shadow-lg overflow-hidden'>
              <iframe
                className='w-full h-96'
                src={
                  `https://www.youtube.com/embed/` +
                  portofolio.fileUrl.match(ID_REGEX)[1]
                }
                title='YouTube video player'
                frameborder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowfullscreen
              ></iframe>
            </div>
          )
        })
      }
    }
    return <div></div>
  }

  if (isLoading) return <Loader />

  return (
    <div className='relative max-w-7xl mx-auto justify-between px-4 sm:px-6'>
      <div className='flex w-full mb-4 rounded justify-center h-100'>
        <img
          src={band?.coverUrl}
          className='object-cover rounded-lg h-96 w-full'
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
                Location : {band?.location}
              </p>
              <p className='text-sm text-gray-800 mt-4'>
                Rate :{' '}
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR'
                }).format(band?.rate)}{' '}
                / hour
              </p>

              {accountType !== 'band' ? (
                <Link
                  to={loginStatus ? '/order/' + band?.id : '/login'}
                  className='w-full justify-center mt-4 inline-flex px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  Make an Appointment
                </Link>
              ) : (
                ' '
              )}
            </div>
          </div>
        </div>
        <div className='flex items-start flex-wrap mt-4 md:mt-0 w-full md:w-2/3 md:ml-4 mx-auto'>
          <div className='flex w-full'>
            <div class='sm:block w-full'>
              <div class=''>
                <nav class='-mb-px flex' aria-label='Tabs'>
                  <span
                    onClick={() => {
                      setShowType('video')
                    }}
                    className={
                      (showType === 'video'
                        ? 'text-indigo-600'
                        : 'text-gray-500') +
                      ' border-transparent hover:text-indigo-700 hover:border-indigio-300 w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm'
                    }
                  >
                    Video
                  </span>
                  <span
                    onClick={() => {
                      setShowType('audio')
                    }}
                    className={
                      (showType === 'audio'
                        ? 'text-indigo-600'
                        : 'text-gray-500') +
                      ' border-transparent hover:text-indigo-700 hover:border-indigio-300 w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm'
                    }
                  >
                    Audio
                  </span>
                  <span
                    onClick={() => {
                      setShowType('youtube')
                    }}
                    className={
                      (showType === 'youtube'
                        ? 'text-indigo-600'
                        : 'text-gray-500') +
                      ' border-transparent hover:text-indigo-700 hover:border-indigio-300 w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm'
                    }
                    aria-current='page'
                  >
                    Youtube
                  </span>
                </nav>
              </div>
            </div>
          </div>
          <RenderPorto />
          <div className='flex w-full'></div>
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
          <div className='bg-white shadow rounded-lg mt-1 w-full'>
            <div className='px-4 py-4'>
              <ul className='divide-y divide-gray-200'>
                {band && band.Transactions && band.Transactions.length > 0 ? (
                  band?.Transactions.map(review => {
                    return (
                      <li className='py-4'>
                        <div className='flex w-full'>
                          <div>
                            <h4 className='text-lg font-bold'>
                              <ReactStars
                                count={5}
                                size={24}
                                value={review.rating}
                                edit={false}
                                color2='#ffd700'
                              />
                            </h4>
                            <p className='mt-1'>{review.review}</p>
                          </div>
                        </div>
                      </li>
                    )
                  })
                ) : (
                  <li className='py-2'>
                    <div className='flex'>
                      <div>
                        <p className='mt-1'>No Data Transactions</p>
                      </div>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile
