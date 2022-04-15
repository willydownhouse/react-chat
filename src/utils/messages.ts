import { FETCH_SUCCESS, IAppAction, IMessage } from '../interfaces';
import {
  getDocs,
  collection,
  getDoc,
  setDoc,
  doc,
  query,
  orderBy,
  limit,
} from '@firebase/firestore';
import { db } from '../firebase';
import React, { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

export const useMessages = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const mesRef = collection(db, 'messages');

  const q = query(mesRef, orderBy('createdAt', 'desc'), limit(25));

  useEffect(() => {
    setLoading(true);

    getDocs(q)
      .then(res => {
        const data = res.docs
          .map(doc => ({ ...doc.data(), id: doc.id }))
          .reverse();

        setMessages(data as IMessage[]);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { messages, loading, error };
};

export const fetchMessages = async (
  dispatch: React.Dispatch<IAppAction>,
  numOfMsg = 20
) => {
  try {
    const mesRef = collection(db, 'messages');

    const q = query(mesRef, orderBy('createdAt', 'desc'), limit(numOfMsg));

    //const res = await getDocs(mesRef);

    //console.log(res.size);
    const res = await getDocs(q);

    const data = res.docs.map(doc => ({ ...doc.data(), id: doc.id })).reverse();

    //console.log(data);

    dispatch({
      type: FETCH_SUCCESS,
      payload: data as IMessage[],
    });

    return data;
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

export const modifyDate = (date: string) => {
  const today = new Date().toLocaleDateString();
  const d = new Date(date).toLocaleDateString();
  const time = new Date(date).toLocaleTimeString().split('');

  return `${today === d ? 'today' : d} ${time.slice(0, -6).join('')}`;
};

export const useMsgForComment = (id: string) => {
  const [message, setMessage] = useState<IMessage | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setMessage(null);
      return;
    }

    setLoading(true);
    const messageRef = doc(db, 'messages', id);

    getDoc(messageRef)
      .then(res => {
        setMessage(res.data() as IMessage);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  return {
    message,
    error,
    loading,
  };
};
