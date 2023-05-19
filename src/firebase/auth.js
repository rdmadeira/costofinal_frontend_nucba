import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { firebaseConfig } from './firebaseConfig.js';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  /* confirmPasswordReset, */
} from 'firebase/auth';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);

export const createUser = async (user) => {
  let response = { isSuccesful: null, message: null };
  if (user.contraseña !== user['confirme la contraseña']) {
    return {
      isSuccesful: false,
      message: 'La confirmación de contraseña no coincide',
    };
  }
  await createUserWithEmailAndPassword(auth, user.email, user.contraseña)
    .then((userCredential) => {
      let { displayName, email, uid } = userCredential.user;
      const createdAt = new Date().toLocaleString();

      displayName = user.nombre + ' ' + user.apellido;

      const newUser = {
        uid,
        nombre: user.nombre,
        apellido: user.apellido,
        createdAt,
        displayName,
        email,
        phone: user.telefono,
        dirección: {
          calle: user.calle,
          numero: user.numero,
          complemento: user.complemento,
          localidad: user.localidad,
          CP: user['CP'],
        },
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

export const loginUserHandle = async (user) => {
  let response = { isSuccesful: null, message: null };

  await signInWithEmailAndPassword(auth, user.email, user.contraseña)
    .then(() => {
      response.isSuccesful = true;
      response.message = 'Login efectuado con suceso!';
    })
    .catch((error) => {
      response.isSuccesful = false;
      response.message = error.code;
    });
  return response;
};

export const getUserFromDB = async (userId) => {
  let userData;
  const userRef = await getDoc(doc(db, 'users', userId));
  if (userRef.exists()) {
    userData = userRef.data();
  }
  return userData;
};

export const upDateDataToDB = async (updatedData) => {
  const userRef = doc(db, 'users', updatedData.uid);
  let response = { isSuccesful: null, message: null };
  await setDoc(userRef, updatedData)
    .then(() => {
      response.isSuccesful = true;
      return;
    })
    .catch((err) => {
      response = { isSuccesful: false, message: err.code };
      return;
    });
  return response;
};

export const signOut = () => {
  return auth.signOut();
};

export const resetPassword = async (email) => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      alert('Link enviado! Entrá en su email para restablecer la contraseña.');
    })
    .catch((err) => {
      if (err.code === 'auth/user-not-found' || err.code === 'INVALID_EMAIL') {
        alert('User not found, try again!');
      }
    });
};

/* export const confirmThePasswordReset = async (oobCode, newPassword) => {
  if (!oobCode && !newPassword) return;

  return await confirmPasswordReset(auth, oobCode, newPassword);
}; */
