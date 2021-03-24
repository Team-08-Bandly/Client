import { useState, useEffect } from 'react'
import { Firebase } from '../initFirebase'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import Moment from 'moment'
import axios from '../config/axios'

export default function Chat() {
  const [chat, setChat] = useState('')
  const [chats, setChats] = useState([])
  const { RoomId } = useParams()
  const { accountType } = useSelector(state => state.userData)
  const band = useSelector(state => state.bands.band)

  useEffect(() => {
    Firebase.database().ref(RoomId).on('value', snapshot => {
      setChats(snapshot.val().chats)
    })
  }, [])

  const sendChat = (e) => {
    e.preventDefault()
    const newChats = Firebase.database().ref(RoomId)
    newChats.get()
      .then(snapshot => {
        let temp = snapshot.val()
        temp.chats.push({ chat, date: Moment(new Date()).format('DD/MM/YYYY HH:mm:ss'), accountType })
        newChats.set(temp)
        setChat('')
      })
      .catch(err => {
        console.log(err);
      })
    // console.log(newChats);
  }

  return (
    <main>
      <form className="ml-20" onSubmit={sendChat}>
        <h1>Chat</h1>
        <textarea className="border-2 border-gray-400 w-2/5" type="text" value={chat} onChange={(e) => setChat(e.target.value)} /><br />
        <button type="submit">Send</button>
      </form>
      <div>
        <ul>
          {
            chats.map(chat => (
              chat.accountType === accountType ? <li className='flex justify-evenly border-2 border-gray-300 m-3 p-2 mx-16'>
                <h4 className="text-md font-semibold">{chat.chat}</h4>
                <p className="text-md text-gray-600">{chat.date}</p>
              </li> : <li className='flex justify-evenly border-2 border-gray-300 m-3 p-2 mx-16'>
                <p className="text-md text-gray-600">{chat.date}</p>
                <h4 className="text-md font-semibold">{chat.chat}</h4>
              </li>
            ))
          }
        </ul>
      </div>
    </main>
  )
}