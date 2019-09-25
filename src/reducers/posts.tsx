import { IPost } from "./../types/Post";
import { PostActionTypes } from "../types/actions";

const postsReducerDefaultState: IPost[] = [];


const postReducer = (state = postsReducerDefaultState, action: PostActionTypes): IPost[] => {
  switch (action.type) {
    case "CREATE_POST":
      console.log('create post ', action.type);
      return [...state, action.post];
    case "REMOVE_POST":
      console.log('remove post ', action.type);
      return state.filter(({ id }) => id !== action.id);
    case "FETCH_POSTS":
      console.log('fetch post ', action.type);
      return action.posts;
    default:
      return state;
  }
};

export { postReducer };