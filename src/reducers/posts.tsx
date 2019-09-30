import { IPost } from "./../types/Post";
import { PostActionTypes } from "../types/actions";

const postsReducerDefaultState: IPost[] = [];

const postReducer = (state = postsReducerDefaultState, action: PostActionTypes): IPost[] => {
  switch (action.type) {
    case "CREATE_POST":
      // console.log('create post ', action.type);
      return [...state, action.post];
    case "REMOVE_POST":
      // console.log('remove post ', action.type);
      // filter method creates a new array, if we return true for that function
      // then we keep that post in the new array
	    // if we return false then we filter that post out of the new array.
      return state.filter(({ id }) => id !== action.id);
    default:
      return state;
  }
};

export { postReducer };