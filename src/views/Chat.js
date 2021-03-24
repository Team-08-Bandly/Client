import { useState, useEffect } from "react";
import { Firebase } from "../initFirebase";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import axios from "../config/axios";
import Moment from 'moment';
import Loader from '../components/loader'

export default function Chat(props) {
  const [ isLoading, setIsLoading ] = useState(false);
  const [chat, setChat] = useState("");
  const [chats, setChats] = useState([]);
  const { RoomId } = props;
  const { accountType } = useSelector((state) => state.userData);
  const band = useSelector((state) => state.bands.band);

  useEffect(() => {
    if(RoomId != ''){
      setIsLoading(true);
      Firebase.database()
      .ref(RoomId)
      .on("value", (snapshot) => {
        setChats(snapshot.val().chats);
        setIsLoading(false)
      });
    }
  }, []);


  const sendChat = (e) => {
    e.preventDefault();
    const newChats = Firebase.database().ref(RoomId);
    newChats
      .get()
      .then((snapshot) => {
        let temp = snapshot.val();
        temp.chats.push({
          chat,
          date: Moment(new Date()).format("DD/MM/YYYY HH:mm:ss"),
          accountType,
        });
        newChats.set(temp);
        setChat("");
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(newChats);
  };

  if(RoomId === ''){
    return <div></div>
  }

  return (
    <section
      aria-labelledby="message-heading"
      className="min-w-0 flex-1 h-full flex flex-col overflow-hidden xl:order-last"
    >
      {isLoading ? <Loader /> : ''}
      <div className="min-h-0 flex-1 overflow-y-auto">
        <ul className="py-4 space-y-2 sm:px-6 sm:space-y-4 lg:px-8">
          {chats.map( (chat) => {
            return (
              <li className={ ( chat.accountType === accountType ? 'justify-end' : '') + " w-full flex"}>
              <div className={ ( chat.accountType === accountType ? 'bg-indigo-500 text-white' : 'bg-white') +" px-4 w-1/2 py-6 shadow sm:rounded-lg sm:px-6"}>
                <div className="sm:flex sm:justify-between sm:items-baseline">
                  <h3 className="text-base font-medium">
                    <span className="">&nbsp;</span>
                  </h3>
                  <p className="mt-1 text-sm whitespace-nowrap sm:mt-0 sm:ml-3">
                    <time datetime={chat.date}>
                      { chat.date }
                    </time>
                  </p>
                </div>
                <div className="mt-4 space-y-6 text-sm">
                  <p>{ chat.chat }</p>
                </div>
              </div>
              </li>
            )
          } )}
        </ul>
      </div>
      <div className="flex">
        <textarea className="py-3 px-4 block w-3/4 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 resize-none" value={chat} onChange={(e) => setChat(e.target.value)} ></textarea>
        <button className="w-1/4 text-white bg-indigo-600 px-3 py-2" onClick={sendChat}>
          Send
        </button>
      </div>
    </section>
  );
}
