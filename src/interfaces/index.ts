import React from 'react';

export interface IMessage {
  id: string;
  author: string;
  createdAt: string;
  text: string;
}

export interface IUser {
  name: string;
  email: string;
  photoURL: string;
}

export interface INotification {
  text: string;
  color: string;
}

export interface IAppState {
  messages: IMessage[];
  user: IUser | null;
  notification: INotification | null;
}

export interface IStateContext {
  state: IAppState;
  dispatch: React.Dispatch<IAppAction>;
}

interface BaseAction {
  type: string;
}

interface AppAction extends BaseAction {
  payload?: IMessage[] | IUser | INotification;
}

export type IAppAction = AppAction;

export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';
export const SET_NOTIFICATION = 'SET_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
