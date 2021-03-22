import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import useListGenre from '../hooks/genreHooks'
import axios from '../config/axios'
import { toast } from 'react-toastify'
import Loader from '../components/loader'

import 'react-toastify/dist/ReactToastify.css'

const configToastify = require('../config/toastify')

function ProfileForm () {
  const [isLoading, setIsLoading] = useState(true)

  const listGenre = useListGenre()

  const [isUpdate, setIsUpdate] = useState(false)

  const [genres, setGenres] = useState([])

  const [profileImg, setProfileImg] = useState(null)
  const [coverImg, setCoverImg] = useState(null)

  const [profileData, setProfileData] = useState({
    name: '',
    description: '',
    location: '',
    rate: 0,
    genre: []
  })

  const submitProfile = () => {
    setIsLoading(true)
    let form = new FormData()
    form.append('imageUrl', profileImg)
    form.append('coverUrl', coverImg)
    form.append('name', profileData.name)
    form.append('description', profileData.description)
    form.append('location', profileData.location)
    form.append('rate', profileData.rate)
    profileData.genre.forEach(genre => {
      form.append('genre[]', genre)
    })
    if (isUpdate) {
      axios({ contentType: 'multipart/form-data' })
        .put('/bands', form)
        .then(() => {
          toast('Success save data band', configToastify)
        })
        .then(() => {
          setIsLoading(false)
        })
    } else {
      axios({ contentType: 'multipart/form-data' })
        .post('/bands', form)
        .then(() => {
          toast('Success save data band')
        })
        .then(() => {
          setIsLoading(false)
        })
    }
  }

  useEffect(() => {
    setProfileData({ ...profileData, genre: genres.map(genre => genre.value) })
  }, [genres])

  useEffect(() => {
    axios()
      .get('/bands/myProfile')
      .then(({ data }) => {
        if (data.band) {
          const { name, rate, description, location } = data.band
          setProfileData({ name, rate, description, location })
          let populatedGenre = data.band.Genres.map(genre => ({
            value: genre.id,
            label: genre.name
          }))
          setGenres(populatedGenre)
          setIsUpdate(true)
        }
      })
      .then(() => {
        setIsLoading(false)
      })
  }, [])

  return (
    <div className='flex container mx-auto justify-center items-center'>
      {isLoading ? <Loader /> : ''}
      <div className='flex flex-col w-full lg:w-1/2 bg-white shadow rounded-lg px-4 py-4'>
        <div>
          <h3 className='text-lg leading-6 font-medium text-gray-900'>
            Profile
          </h3>
          <p className='mt-1 max-w-2xl text-sm text-gray-500'>
            Update your band profile data.
          </p>
        </div>
        <div className='w-full mt-4'>
          <label
            for='first_name'
            className='block text-sm font-medium text-gray-700'
          >
            Band Name
          </label>
          <input
            type='text'
            value={profileData.name}
            onChange={e =>
              setProfileData({ ...profileData, name: e.target.value })
            }
            name='first_name'
            id='first_name'
            autoComplete='given-name'
            className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
          />
        </div>
        <div className='w-full mt-4'>
          <label
            htmlFor='deskripsi'
            className='block text-sm font-medium text-gray-700'
          >
            Overview
          </label>
          <textarea
            name='deskripsi'
            value={profileData.description}
            onChange={e =>
              setProfileData({ ...profileData, description: e.target.value })
            }
            id='deskripsi'
            autoComplete='deskripsi'
            className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
          ></textarea>
        </div>
        <div className='w-full mt-4'>
          <label
            for='lokasi'
            className='block text-sm font-medium text-gray-700'
          >
            Location
          </label>
          <textarea
            type='text'
            value={profileData.location}
            onChange={e =>
              setProfileData({ ...profileData, location: e.target.value })
            }
            name='lokasi'
            id='lokasi'
            autoComplete='lokasi'
            className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
          ></textarea>
        </div>
        <div className='w-full mt-4'>
          <label for='rate' className='block text-sm font-medium text-gray-700'>
            Rate per hour
          </label>
          <input
            type='number'
            value={profileData.rate}
            onChange={e =>
              setProfileData({ ...profileData, rate: e.target.value })
            }
            min={1}
            name='rate'
            id='rate'
            autoComplete='rate'
            className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
          />
        </div>
        <div className='mt-4'>
          <label className='block text-sm font-medium text-gray-700'>
            Genre('s)
          </label>
          <Select
            menuPortalTarget={document.body}
            value={genres}
            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
            onChange={e => setGenres(e)}
            isMulti
            options={listGenre}
            multiple
            className='mt-1 focus:ring-blue-500 px-2 py-2 focus:border-blue-500 px-2 py-2 block w-full shadow-sm sm:text-sm border-2 border-gray-300 rounded-md'
          />
        </div>
        <div className='w-full mt-4'>
          <label
            for='imageUrl'
            className='block text-sm font-medium text-gray-700'
          >
            Profile Image
          </label>
          <input
            onChange={e => setProfileImg(e.target.files[0])}
            type='file'
            name='imageUrl'
            id='imageUrl'
            autoComplete='imageUrl'
            className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-4 py-2'
          />
        </div>
        <div className='w-full mt-4'>
          <label
            for='coverUrl'
            className='block text-sm font-medium text-gray-700'
          >
            Cover Image
          </label>
          <input
            onChange={e => setCoverImg(e.target.files[0])}
            type='file'
            name='coverUrl'
            id='coverUrl'
            autoComplete='coverUrl'
            className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-4 py-2'
          />
        </div>
        <div className='w-full mt-4'>
          <button
            onClick={submitProfile}
            type='button'
            className='w-full justify-center inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfileForm
