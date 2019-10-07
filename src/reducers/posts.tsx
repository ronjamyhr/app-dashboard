import { IPost } from "./../types/Post";
import { AppActions } from "../types/actions";

const postsReducerDefaultState: IPost[] = [];

const postReducer = (state = postsReducerDefaultState, action: AppActions): IPost[] => {
    switch (action.type) {
        case "CREATE_POST":
            return [...state, action.post];
        case "REMOVE_POST":

            // filter method creates a new array, if we return true for that function
            // then we keep that post in the new array
            // if we return false then we filter that post out of the new array.
            return state.filter(({ id }) => id !== action.id);
        default:
            return state;
    }
};

export { postReducer };