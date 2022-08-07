import { configureStore, createSlice } from "@reduxjs/toolkit";

interface NavMode {
  navMode: "default" | "meetingRoom" | "unseen";
  isCreatingRoom: boolean;
  isCreatingGame: boolean;
  isShowingGame: boolean;
  isShowingMessage: boolean;
}
const initialState: NavMode = {
  navMode: "default",
  isCreatingRoom: false,
  isCreatingGame: false,
  isShowingGame: false,
  isShowingMessage: false,
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
    setIsShowingGame(state, actions) {
      state.isShowingGame = actions.payload;
    },
    setIsShowingMessage(state, actions) {
      state.isShowingMessage = actions.payload;
    }
  },
});
export const store = configureStore({
  reducer: {
    navbar: navbar.reducer,
  },
});
export const { setNavMode, setIsCreatingRoom, setIsCreatingGame, setIsShowingGame, setIsShowingMessage } =
  navbar.actions;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
