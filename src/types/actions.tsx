import { IPost } from "./Post";

export const FETCH_POSTS = "FETCH_POSTS";
export const CREATE_POST = "CREATE_POST";
export const REMOVE_POST = "REMOVE_POST";

export interface IFetchPostsAction {
  type: typeof FETCH_POSTS;
  posts: IPost[];
}

export interface RemovePostAction {
  type: typeof REMOVE_POST;
  id: string;
}

export interface CreatePostAction {
  type: typeof CREATE_POST;
  post: IPost;
}

export type PostActionTypes =
  | IFetchPostsAction
  | RemovePostAction
  | CreatePostAction;

export type AppActions = PostActionTypes;