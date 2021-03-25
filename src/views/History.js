import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserTransaction } from '../store/actions'
import ModalRating from '../components/modalRating'
import ReactStars from 'react-stars'
import { useHistory } from 'react-router-dom'

function History () {
  const { transactions } = useSelector(state => state.userData)
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)
  const [activeRating, setActiveRating] = useState('')
  const [activeReview, setActiveReview] = useState('')
  const [activeId, setActiveId] = useState('')
  const history = useHistory()
  const [sortedTransactions, setSortedTransactions] = useState([])

  function handleClick (e, transaction) {
    console.log(transaction)
    if (transaction.rating === null) {
      e.preventDefault()
      // console.log(transaction, '<<<handleClick')
      setActiveRating(transaction.rating)
      setActiveReview(transaction.review)
      setActiveId(transaction.id)
      setShowModal(true)
    } else {
      e.preventDefault()
      history.push(`/profile/${transaction.BandId}`)
    }
  }

  function closeModal () {
    setShowModal(false)
    dispatch(fetchUserTransaction())
  }

  useEffect(() => {
    const sort = transactions?.Transactions?.sort((a, b) => +a.id - +b.id)
    setSortedTransactions(sort)
    console.log(sortedTransactions)
  }, [sortedTransactions, transactions.Transactions])

  useEffect(() => {
    dispatch(fetchUserTransaction())
  }, [dispatch])

  return (
    <>
      <ModalRating
        show={showModal}
        rating={activeRating}
        review={activeReview}
        closeModal={closeModal}
        transactionId={activeId}
      />
      <div className='relative max-w-7xl mx-auto justify-between px-4 sm:px-6'>
        <div>
          <h3 className='text-lg leading-6 font-medium text-gray-900'>
            Transaction History
          </h3>
          <br />
        </div>
        <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
            <div className='shadow overflow-x-auto border-b border-gray-200 sm:rounded-lg'>
              <table className='w-full divide-y table-fixed divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      Band
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      Date
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      Address
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      Duration
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      Total fee
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      Status
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      Rating
                    </th>
                    <th scope='col' className='relative px-6 py-3'>
                      <span className='sr-only'>Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedTransactions?.map(transaction => (
                    <>
                      <tr className='bg-white' key={transaction?.id}>
                        <td className='px-6 py-4 text-sm font-medium text-gray-900'>
                          {transaction?.Band?.name}
                        </td>
                        <td className='px-6 py-4 text-sm text-gray-500'>
                          {transaction?.date.split('T')[0]}
                        </td>
                        <td className='px-6 py-4 text-sm text-gray-500'>
                          {transaction?.address}
                        </td>
                        <td className='px-6 py-4 text-sm text-gray-500'>
                          {transaction?.duration} hour(s)
                        </td>
                        <td className='px-6 py-4 text-sm text-gray-500'>
                          {new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR'
                          }).format(
                            transaction?.duration * transaction?.Band?.rate
                          )}
                        </td>
                        <td className='px-6 py-4 text-sm text-gray-500'>
                          {transaction?.status}
                        </td>
                        <td className='px-6 py-4 text-sm text-gray-500'>
                          <ReactStars
                            count={5}
                            size={16}
                            color2={'#ffd700'}
                            value={transaction?.rating}
                            edit={false}
                          />
                        </td>
                        <td className='px-6 py-4 text-right text-sm font-medium'>
                          <a
                            href='/rate'
                            className='text-indigo-600 hover:text-indigo-900'
                            onClick={e => handleClick(e, transaction)}
                          >
                            {transaction.rating === null
                              ? 'Rate this band'
                              : "You've rated this band"}
                          </a>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default History
