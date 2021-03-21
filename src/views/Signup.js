import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { register } from '../store/actions'
import { useHistory } from 'react-router-dom'

function SignUp () {
  const dispatch = useDispatch()
  const history = useHistory()

  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: '',
    accountType: ''
  })

  function handleChange (e) {
    const newForm = {
      ...formValue,
      [e.target.id]: e.target.value
    }
    console.log(newForm)
    setFormValue(newForm)
  }

  function handleSignUp (e) {
    e.preventDefault()
    dispatch(register(formValue))
    history.push('/login')
  }

  return (
    <div class='flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div class='max-w-md w-full space-y-8'>
        <div>
          <img
            class='mx-auto h-12 w-auto'
            src='https://tailwindui.com/img/logos/workflow-mark-teal-200-cyan-400.svg'
            alt='Workflow'
          />
          <h2 class='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Join with us
          </h2>
          <p class='mt-2 text-center text-sm text-gray-600'>
            Or
            <Link
              to='/login'
              class='font-medium text-indigo-600 hover:text-indigo-500'
            >
              {' '}
              signin if you already have an account.
            </Link>
          </p>
        </div>
        <form
          class='mt-8 space-y-6'
          action='#'
          method='POST'
          onSubmit={handleSignUp}
        >
          <div class='rounded-md shadow-sm -space-y-px'>
            <div>
              <label for='name' class='sr-only'>
                Name
              </label>
              <input
                id='name'
                name='name'
                type='text'
                autocomplete='name'
                required
                class='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                placeholder='Full Name'
                onChange={handleChange}
              />
            </div>
            <div>
              <label for='email' class='sr-only'>
                Email address
              </label>
              <input
                id='email'
                name='email'
                type='email'
                autocomplete='email'
                required
                class='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                placeholder='Email address'
                onChange={handleChange}
              />
            </div>
            <div>
              <label for='accountType' class='sr-only'>
                Im
              </label>
              <select
                id='accountType'
                name='account-type'
                required
                class='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                onChange={handleChange}
              >
                <option selected disabled>
                  I .....
                </option>
                <option value='band'>I want to perform</option>
                <option value='client'>I want to hire performer</option>
              </select>
            </div>
            <div>
              <label for='password' class='sr-only'>
                Password
              </label>
              <input
                id='password'
                name='password'
                type='password'
                autocomplete='current-password'
                required
                class='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                placeholder='Password'
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <button
              type='submit'
              class='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              <span class='absolute left-0 inset-y-0 flex items-center pl-3'>
                <svg
                  class='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  aria-hidden='true'
                >
                  <path
                    fill-rule='evenodd'
                    d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
                    clip-rule='evenodd'
                  />
                </svg>
              </span>
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp
