import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
// import { v4 as uuidv4 } from 'uuid';

// import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyCgh-bcnxPvdlayp5bD1du8wH1ZzK_49bc',
  authDomain: 'costofinal-b391b.firebaseapp.com',
  projectId: 'costofinal-b391b',
  storageBucket: 'costofinal-b391b.appspot.com',
  messagingSenderId: '75874645639',
  appId: '1:75874645639:web:56bd9d47fe6a0373b82a22',
  measurementId: 'G-JT7HWX4825',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// const analytics = getAnalytics(app);

export const createUser = async (user) => {
  let response = { isSuccesful: null, message: null };
  await createUserWithEmailAndPassword(auth, user.email, user.password)
    .then((userCredential) => {
      let { displayName, email, uid } = userCredential.user;
      const createdAt = new Date().toLocaleString();

      displayName = user.name + ' ' + user.lastname;

      const newUser = {
        uid,
        createdAt,
        displayName,
        email,
        phone: user.phone,
        address: user.address,
      };

      setDoc(doc(db, 'users', newUser.uid), newUser);

      response.isSuccesful = true;
      response.message = displayName;
    })
    .catch((error) => {
      response.isSuccesful = false;
      response.message = error.code;
      return error;
    });
  return response;
};
