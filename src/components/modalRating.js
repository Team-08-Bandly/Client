import ReactStars from 'react-stars'
import { useState, useEffect } from 'react'
import { reviewRating, fetchUserTransaction } from '../store/actions'
import { useDispatch } from 'react-redux'

function ModalRating (props) {
  // console.log(props)
  const [formValue, setFormValue] = useState({
    rating: 0,
    review: ''
  })
  const dispatch = useDispatch()
  // console.log(props.rating, props.review)

  const ratingChanged = newRating => {
    setFormValue({
      ...formValue,
      rating: newRating
    })
    console.log(formValue)
  }

  function reviewChanged (e) {
    const newReview = {
      ...formValue,
      [e.target.id]: e.target.value
    }
    setFormValue(newReview)
  }

  function submitReview () {
    dispatch(reviewRating({ ...formValue, id: props.transactionId }))
    props.closeModal()
    dispatch(fetchUserTransaction())
  }

  useEffect(() => {
    setFormValue({ ...formValue, review: props.review, rating: props.rating })
    // console.log(formValue)
  }, [])

  return (
    <>
      <div
        className={
          (props.show ? 'block' : 'hidden') +
          ' fixed z-10 inset-0 overflow-y-auto'
        }
      >
        <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
            <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
          </div>

          <span
            className='hidden sm:inline-block sm:align-middle sm:h-screen'
            aria-hidden='true'
          >
            &#8203;
          </span>

          <div
            className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6'
            role='dialog'
            aria-modal='true'
            aria-labelledby='modal-headline'
          >
            <div class='hidden sm:block absolute top-0 right-0 pt-4 pr-4'>
              <button
                onClick={props.closeModal}
                type='button'
                class='bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                <span class='sr-only'>Close</span>
                <svg
                  class='h-6 w-6'
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
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>
            <div>
              <div className='mt-3 text-center sm:mt-5'>
                <div className='mt-2 flex px-2'>
                  <div class='sm:col-span-12 w-full'>
                    <div>
                      <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={24}
                        color2={'#ffd700'}
                        value={formValue.rating}
                      />
                    </div>
                    <div class=''>
                      <textarea
                        placeholder='Review'
                        name='review'
                        id='review'
                        rows='10'
                        value={formValue.review}
                        onChange={reviewChanged}
                        class='py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md'
                      />
                    </div>
                    <button
                      type='button'
                      class='mt-2 inline-flex px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                      onClick={submitReview}
                    >
                      Add review
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ModalRating
