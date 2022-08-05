import { configureStore, createSlice } from "@reduxjs/toolkit";

interface NavMode {
  navMode: "default" | "meetingRoom" | "unseen";
  isCreatingRoom: boolean;
  isCreatingGame: boolean;
}
const initialState: NavMode = {
  navMode: "default",
  isCreatingRoom: false,
  isCreatingGame: false,
};
const navbar = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    setNavMode(state, actions) {
      state.navMode = actions.payload;
    },
    setIsCreatingRoom(state, actions) {
      state.isCreatingRoom = actions.payload;
    },
    setIsCreatingGame(state, actions) {
      state.isCreatingGame = actions.payload;
    },
  },
});
export const store = configureStore({
  reducer: {
    navbar: navbar.reducer,
  },
});
export const { setNavMode, setIsCreatingRoom, setIsCreatingGame } =
  navbar.actions;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
