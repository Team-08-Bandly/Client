import React, { useEffect, useState } from "react";
import axios from '../config/axios';
import Moment from 'react-moment';
import Chat from './Chat';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

function Chatlist() {

    const { accountType } = useSelector((state) => state.userData);

    const [ listChat, setListChat ] = useState([]);

    const { RoomId } = useParams();

    const [ roomId, setRoomId ] = useState( RoomId || '' );

    useEffect(() => {
        axios().get('/chatRoom').then(({ data }) => {
            setListChat(data.roomChat)
        })
    },[]);

    useEffect(() => {
        console.log(roomId);
    },[roomId])

  return (
    <div className="relative max-w-7xl px-4 mx-auto justify-between flex overflow-hidden" style={{ height: '85vh' }}>
      <div className="min-h-0 flex-1 flex overflow bg-gray-100 shadow rounded-lg ">
        <main className="min-w-0 flex-1 border-t border-gray-200 xl:flex">
          <Chat key={roomId} RoomId={roomId}/>
          <aside className="hidden xl:block xl:flex-shrink-0 xl:order-first">
            <div className="h-full relative flex flex-col w-96 border-r border-gray-200 bg-gray-100">
              <div className="flex-shrink-0">
                <div className="h-16 bg-white px-6 flex flex-col justify-center">
                  <div className="flex items-baseline space-x-3">
                    <h2 className="text-lg font-medium text-gray-900">Chat</h2>
                  </div>
                </div>
              </div>
              <nav
                aria-label="Message list"
                className="min-h-0 flex-1 overflow-y-auto"
              >
                <ul className="border-b border-gray-200 divide-y divide-gray-200">
                  {listChat.map(chat => {
                      return(
                        <li onClick={ () => { setRoomId(chat.RoomId) } } className="cursor-pointer relative bg-white py-5 px-6 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600">
                            <div className="flex justify-between space-x-3">
                            <div className="min-w-0 flex-1">
                                <span className="block focus:outline-none">
                                    <span
                                        className="absolute inset-0"
                                        aria-hidden="true"
                                    ></span>
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        { (accountType === 'band') ? chat.User.name : chat.Band.name }
                                    </p>
                                    <p className="text-sm text-gray-500 truncate">
                                        { (accountType === 'band') ? '' : chat.Band.location }
                                    </p>
                                </span>
                            </div>
                            <time
                                datetime={ chat.createdAt }
                                className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500"
                            >
                                <Moment fromNow>{ chat.createdAt }</Moment>
                            </time>
                            </div>
                            <div className="mt-1">
                            <p className="line-clamp-2 text-sm text-gray-600">
                                { (accountType === 'band') ? '' : chat.Band.description }
                            </p>
                            </div>
                        </li>
                      )
                  })}
                  
                </ul>
              </nav>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}

export default Chatlist;
