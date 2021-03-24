import Firebase from "firebase/app"
import 'firebase/auth'
import 'firebase/database'

const config = {
  apiKey: 'AIzaSyDINqgiMKbZJnB3FQ0BsXHRBStuQyi9RLk',
  databaseURL: 'https://chatroom-bandly-default-rtdb.firebaseio.com/',
  projectId: 'chatroom-bandly'
}

function initFirebase() {
  Firebase.initializeApp(config)
}

initFirebase()

export { Firebase }