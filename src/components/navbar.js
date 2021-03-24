import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  setLoginFalse,
  setAccountName,
  setAccountEmail,
  setAccountType
} from '../store/actions'
import { useDispatch } from 'react-redux'
import { fetchUser } from '../store/actions'
import ModalPorto from './modalPorto'
import ModalPortoLink from './modalPortoLink'

import logo from '../bandly.png'

function Navbar () {
  const loginStatus = useSelector(state => state.loginStatus.isLoggedIn)
  const { accountType } = useSelector(state => state.userData)
  const dispatch = useDispatch()
  const history = useHistory()
  const [showModal, setShowModal] = useState(false)

  const [showModalLink, setShowModalLink] = useState(false)

  const [showDropdown, setShowDropdown] = useState(false)

  function handleClick (e) {
    if (loginStatus) {
      e.preventDefault()
      dispatch(setLoginFalse())
      dispatch(setAccountName(''))
      dispatch(setAccountEmail(''))
      dispatch(setAccountType(''))
    }
  }

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  useEffect(() => {
    if (loginStatus) {
      dispatch(fetchUser())
    }
  }, [dispatch, loginStatus])

  useEffect(() => {}, [loginStatus])

  return (
    <div className='bg-gray-50 pt-6'>
      <ModalPorto
        show={showModal}
        closeModal={() => {
          setShowModal(false)
        }}
      />
      <ModalPortoLink
        show={showModalLink}
        closeModal={() => {
          setShowModalLink(false)
        }}
      />
      <nav
        className='relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6'
        aria-label='Global'
      >
        <div className='flex items-center flex-1'>
          <div className='flex items-center justify-between w-full md:w-auto'>
            <Link to='/'>
              <span className='sr-only'>Workflow</span>
              <img className='h-6 w-auto' src={logo} alt='logo' />
            </Link>
            <div className='-mr-2 flex items-center md:hidden'>
              <button
                type='button'
                className='bg-gray-900 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus-ring-inset focus:ring-white'
                aria-expanded='false'
              >
                <span className='sr-only'>Open main menu</span>
                <svg
                  className='h-6 w-6'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className='hidden space-x-8 md:flex md:ml-10'>
            <Link to='/'>
              <span className='text-base font-medium text-gray-500 hover:text-gray-300'>
                Home
              </span>
            </Link>
            <Link to='/bands'>
              <span className='text-base font-medium text-gray-500 hover:text-gray-300'>
                Band
              </span>
            </Link>
          </div>
        </div>
        <div className='hidden md:flex md:items-center md:space-x-6'>
          <Link
              to={loginStatus ? '/chatroom' : ''}
            >
              <span className='text-base font-medium text-gray-500 hover:text-gray-300'>
                {loginStatus ? 'Messages' : ''}
              </span>
            </Link>
          {loginStatus ? (
            accountType === 'band' ? (
              <button
                className='relative dropdown:block text-base font-medium text-gray-500'
                onClick={() => setShowDropdown(!showDropdown)}
                style={{ zIndex: 100 }}
                role='navigation'
                aria-haspopup='true'
              >
                Portofolio
                <ul
                  class={
                    (showDropdown ? 'block' : 'hidden') +
                    ' absolute bg-white rounded-lg shadow px-2 py-2 top-6 left-0 w-64 text-left'
                  }
                  aria-label='submenu'
                >
                  <li
                    className='mt-2'
                    onClick={() => {
                      setShowModal(true)
                    }}
                  >
                    <span>Upload From File</span>
                  </li>
                  <li
                    className='mt-2'
                    onClick={() => {
                      setShowModalLink(true)
                    }}
                  >
                    <span>Add From Youtube</span>
                  </li>
                </ul>
              </button>
            ) : (
              ' '
            )
          ) : (
            ' '
          )}
          {accountType === 'band' ? (
            <Link to='/myprofile'>
              <span className='text-base font-medium text-gray-500 hover:text-gray-300'>
                My Profile
              </span>
            </Link>
          ) : (
            ' '
          )}
          <Link
            to={
              loginStatus
                ? accountType === 'band'
                  ? '/profile'
                  : '/history'
                : '/login'
            }
          >
            <span className='text-base font-medium text-gray-500 hover:text-gray-300'>
              {loginStatus
                ? accountType === 'band'
                  ? 'Profile'
                  : 'Transaction History'
                : 'Log in'}
            </span>
          </Link>
          <Link
            to={loginStatus ? '/logout' : '/register'}
            onClick={handleClick}
          >
            <span className='inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700'>
              {loginStatus ? 'Logout' : 'Register'}
            </span>
          </Link>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
