import React from 'react';

export interface IMessage {
  id: string;
  authorId: string;
  author: string;
  authorImg: string;
  createdAt: string;
  text: string;
  isCommentOfMsgId: string | null;
  imgUrl?: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  photoURL: string;
  token: string;
}

export interface INotification {
  text: string;
  color: string;
}

export interface IAppState {
  messages: IMessage[];
  user: IUser | null;
  notification: INotification | null;
  isCommentingMsgId: string | null;
}

export interface IStateContext {
  state: IAppState;
  dispatch: React.Dispatch<IAppAction>;
}

interface BaseAction {
  type: string;
}

interface AppAction extends BaseAction {
  payload?: IMessage[] | IUser | INotification | string;
}

export type IAppAction = AppAction;

export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';
export const SET_NOTIFICATION = 'SET_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const COMMENT_MSG = 'COMMENT_MSG';
export const REMOVE_MSG_COMMENT = 'REMOVE_MSG_COMMENT';
