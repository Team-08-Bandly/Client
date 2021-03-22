import React, { useState } from 'react'

import { useParams } from 'react-router-dom'
import axios from 'axios'
import SuccessForm from './SuccessForm'

function Orderform () {
  let [successOrder, setSuccessOrder] = useState(false)
  let [formValue, setFormValue] = useState({
    name: '',
    location: '',
    date: '',
    duration: 0
  })
  let snapApi = process.env.REACT_APP_APIURL || 'http://localhost:3000'
  let { id } = useParams()
  function payButton () {
    axios
      .get(`${snapApi}/transactions/`, {
        params: { ...formValue, bandId: id },
        headers: { access_token: localStorage.getItem('access_token') }
      })
      .then(snapResponse => {
        window.snap.pay(snapResponse.data.snapToken, {
          onSuccess: function (result) {
            setSuccessOrder(true)
          }
        })
      })
  }

  function handleChange (e) {
    const newForm = {
      ...formValue,
      [e.target.id]: e.target.value
    }
    console.log(newForm)
    setFormValue(newForm)
  }

  if (successOrder) return <SuccessForm bandId={id} />

  return (
    <div className='flex container mx-auto justify-center items-center'>
      <div className='flex flex-col w-full lg:w-1/2 bg-white shadow rounded-lg px-4 py-4'>
        <div>
          <h3 className='text-lg leading-6 font-medium text-gray-900'>
            Appointment Form
          </h3>
          <p className='mt-1 max-w-2xl text-sm text-gray-500'>
            Please fill detail about your appointment.
          </p>
        </div>
        <div className='w-full mt-4'>
          <label
            for='first_name'
            className='block text-sm font-medium text-gray-700'
          >
            Customer Name
          </label>
          <input
            type='text'
            name='first_name'
            id='name'
            autocomplete='given-name'
            className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
            onChange={handleChange}
          />
        </div>
        <div className='w-full mt-4'>
          <label
            for='tanggal'
            className='block text-sm font-medium text-gray-700'
          >
            Date
          </label>
          <input
            type='date'
            name='tanggal'
            id='date'
            autocomplete='tanggal'
            className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
            onChange={handleChange}
          />
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
            name='lokasi'
            id='location'
            autocomplete='lokasi'
            className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
            onChange={handleChange}
          ></textarea>
        </div>
        <div className='w-full mt-4'>
          <label
            for='durasi'
            className='block text-sm font-medium text-gray-700'
          >
            Duration ( in hour )
          </label>
          <input
            type='number'
            min={1}
            name='durasi'
            id='duration'
            autocomplete='durasi'
            className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
            onChange={handleChange}
          />
        </div>
        <div className='w-full mt-4'>
          <button
            onClick={payButton}
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

export default Orderform
