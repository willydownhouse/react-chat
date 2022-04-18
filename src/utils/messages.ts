import { IMessage } from '../interfaces';
import {
  collection,
  getDoc,
  setDoc,
  doc,
  query,
  orderBy,
  limit,
} from '@firebase/firestore';
import { db } from '../firebase';
import { useEffect, useState } from 'react';
import { onSnapshot } from 'firebase/firestore';

export const addNewMessage = async (message: IMessage) => {
  try {
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

export const subscribe = (
  setMessages: (val: IMessage[]) => void,
  setLoading: (val: boolean) => void,
  amount: number
) => {
  setLoading(true);
  const q = query(
    collection(db, 'messages'),
    orderBy('createdAt', 'desc'),
    limit(amount)
  );

  return onSnapshot(q, snap => {
    const data = snap.docs
      .map(doc => ({ ...doc.data(), id: doc.id }))
      .reverse();

    setMessages(data as IMessage[]);
    setLoading(false);
  });
};
