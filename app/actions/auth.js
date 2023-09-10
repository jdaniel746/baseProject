import * as actionTypes from './actionTypes';
import { auth, firestore } from '../config/firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const onLoginSuccess = (data) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    data
  };
};

const onLogOut = () => {
  return {
    type: actionTypes.LOGOUT
  };
};

const onResetPassword = (data) => {
  return {
    type: actionTypes.RESET_PASSWORD,
    data
  };
};

const onRegister = () => {
  return {
    type: actionTypes.SIGNUP
  };
};

export const login = (login, callback) => async (dispatch) => {
  //call api and dispatch action case
  try {
    const response = await signInWithEmailAndPassword(auth, login.user, login.password);
    const { uid } = response.user;
    console.log(response);
    const usersRef = doc(firestore, 'users', uid);
    const firestoreDocument = await getDoc(usersRef);

    if (!firestoreDocument.exists) {
      alert('User does not exist anymore.');
    }

    onSnapshot(usersRef, (querySnapshot) => {
      const userDataNew = querySnapshot.data();
      console.log(userDataNew);

      let data = {
        user: { lang: 'en', ...userDataNew }
      };

      dispatch(onLoginSuccess(data));
      if (typeof callback === 'function') {
        console.log("SETTING CALLBACK TRUE")
        AsyncStorage.setItem('user', JSON.stringify(data.user));
        callback({ success: true });
      }
    });
  } catch (e) {
    console.log('ERROR: ' + e);
  }
};

export const register = (user, callback) => async (dispatch) => {
  try {
    const response = await createUserWithEmailAndPassword(auth, user.user, user.password);
    const { uid } = response.user;
    const data = {
      id: uid,
      email: user.user,
      fullName: user.fullName,
      avatar: ''
    };
    const usersRef = doc(firestore, 'users', uid);
    await setDoc(usersRef, data);

    dispatch(onRegister(data));
    if (typeof callback === 'function') {
      callback({ success: true });
    }
  } catch (e) {
    console.log('ERROR: ' + e);
  }
};

export const resetPassword = (email, callback) => (dispatch) => {
  dispatch(onResetPassword());
  if (typeof callback === 'function') {
    callback({ success: true });
  }
};

export const logout = (callback) => (dispatch) => {
  dispatch(onLogOut());
  if (typeof callback === 'function') {
    AsyncStorage.clear();
    callback({ success: false });
  }
};
