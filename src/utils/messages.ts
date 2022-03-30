import { FETCH_SUCCESS, IAppAction, IMessage } from '../interfaces';
import {
  getDocs,
  collection,
  setDoc,
  doc,
  query,
  orderBy,
  limit,
} from '@firebase/firestore';
import { db } from '../firebase';
import React from 'react';

export const fetchMessages = async (dispatch: React.Dispatch<IAppAction>) => {
  try {
    const mesRef = collection(db, 'messages');

    const q = query(mesRef, orderBy('createdAt', 'desc'), limit(3));

    const res = await getDocs(q);

    const data = res.docs.map(doc => ({ ...doc.data(), id: doc.id })).reverse();

    console.log(data);

    dispatch({
      type: FETCH_SUCCESS,
      payload: data as IMessage[],
    });
  } catch (err) {
    console.log(err);
  }
};

export const addNewMessage = async (
  message: IMessage,
  dispatch: React.Dispatch<IAppAction>
) => {
  try {
    console.log(message);
    await setDoc(doc(db, 'messages', message.id), message);
  } catch (err) {
    console.log(err);
  }
};

//(data as IMessage[])
// .sort(
//     (a, b) =>
//       new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
//   )
//   .slice(-3)
