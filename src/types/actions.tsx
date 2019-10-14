import { IPost } from "./Post";
import { IUser } from "./authInterface"

//define each action as an variable and set it to whatever the action-type is 
export const CREATE_POST = "CREATE_POST";
export const REMOVE_POST = "REMOVE_POST";
export const loginSuccess = 'LOGIN_SUCCESS';
export const loginError = 'LOGIN_ERROR';
export const logOut = 'SIGNOUT_SUCCESS';

//export each action in an Interface format
export interface RemovePostAction {
  type: typeof REMOVE_POST;
  id: string;
}

export interface CreatePostAction {
  type: typeof CREATE_POST;
  post: IPost;
}

export interface ILoginSuccessAction {
  type: typeof loginSuccess;
  user: IUser
}

export interface ILoginErrorAction {
  type: typeof loginError,
  user: IUser
}

 export interface ISignOutAction {
  type: typeof logOut
}

export type ActionTypes =
  | RemovePostAction
  | CreatePostAction
  | ILoginSuccessAction
  | ILoginErrorAction
  | ISignOutAction

export type AppActions = ActionTypes;