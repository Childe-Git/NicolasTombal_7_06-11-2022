import { configureStore } from "@reduxjs/toolkit";
import getUserReducer from "../features/reducers/user.reducers";
import getUsersReducer from "../features/reducers/users.reducers";
import getPostsReducer from "../features/reducers/post.reducers";

const store = configureStore({
  reducer: {
    user: getUserReducer,
    users: getUsersReducer,
    posts: getPostsReducer,
  },
});

export default store;
