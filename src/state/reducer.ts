import {
  FETCH_SUCCESS,
  IAppAction,
  IAppState,
  IMessage,
  INotification,
  IUser,
  LOG_IN,
  LOG_OUT,
  REMOVE_NOTIFICATION,
  SET_NOTIFICATION,
} from '../interfaces';

export const reducer = (state: IAppState, action: IAppAction): IAppState => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        user: action.payload as IUser,
      };
    case LOG_OUT:
      return {
        ...state,
        user: null,
      };
    case SET_NOTIFICATION:
      return {
        ...state,
        notification: action.payload as INotification,
      };
    case REMOVE_NOTIFICATION:
      return { ...state, notification: null };
    case FETCH_SUCCESS:
      return {
        ...state,
        messages: action.payload as IMessage[],
      };
    default:
      return state;
  }
};
