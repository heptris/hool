import { configureStore, createSlice } from "@reduxjs/toolkit";
interface StoreProps {
  isNavbar?: boolean;
}
const navbar = createSlice({
  name: "navbar",
  initialState: {
    isNavbar: true,
    isCreatingRoom: true,
  },
  reducers: {
    setIsNavbar(state, actions) {
      state.isNavbar = actions.payload;
    },
    setIsCreatingRoom(state, actions) {
      state.isCreatingRoom = actions.payload;
    },
  },
});
export const store = configureStore({
  reducer: {
    navbar: navbar.reducer,
  },
});
export const { setIsNavbar, setIsCreatingRoom } = navbar.actions;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
