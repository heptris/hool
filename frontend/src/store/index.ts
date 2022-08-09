import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Session, Publisher, Subscriber } from "openvidu-react";

interface NavMode {
  navMode: "default" | "meetingRoom" | "unseen";
  isCreatingRoom: boolean;
  isCreatingGame: boolean;
  isShowingGame: boolean;
  isShowingMessage: boolean;
  isLoggedIn: boolean;
}
export type ClientSessionType = {
  mySessionId: string;
  myUserName: string;
  audioEnabled: boolean;
  videoEnabled: boolean;
  msgToSend: string;
  emojiEvents: Array<string>;
  chatEvents: Array<string>;
  currentVideoDevice?: Object | undefined;
};
const initialState: NavMode = {
  navMode: "default",
  isCreatingRoom: false,
  isCreatingGame: false,
  isShowingGame: false,
  isShowingMessage: false,
  isLoggedIn: !!localStorage.getItem("token"),
};
const sessionInitialState: ClientSessionType = {
  mySessionId: "SessionABC",
  myUserName: "Yan",
  audioEnabled: false,
  videoEnabled: false,
  msgToSend: "",
  emojiEvents: new Array(),
  chatEvents: new Array(),
  currentVideoDevice: undefined,
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
    },
    setIsLoggedIn(state, actions) {
      state.isLoggedIn = actions.payload;
    },
  },
});
const clientSession = createSlice({
  name: "clientSession",
  initialState: sessionInitialState,
  reducers: {
    setMySessionId(state: any, actions: any) {
      state.mySessionId = actions.payload;
    },
    setMyUserName(state: any, actions: any) {
      state.myUserName = actions.payload;
    },
    setAudioEnabled(state: any, actions: any) {
      state.audioEnabled = actions.payload;
    },
    setVideoEnabled(state: any, actions: any) {
      state.videoEnabled = actions.payload;
    },
    setMsgToSend(state: any, actions: any) {
      state.msgToSend = actions.payload;
    },
    setChatEvents(state: any, actions: any) {
      state.chatEvents = [...state.chatEvents, actions.payload];
    },
    setEmojiEvents(state: any, actions: any) {
      state.emojiEvents = [...state.emojiEvents, actions.payload];
    },
  },
});
export const store = configureStore({
  reducer: {
    navbar: navbar.reducer,
    clientSession: clientSession.reducer,
  },
});
export const {
  setNavMode,
  setIsCreatingRoom,
  setIsCreatingGame,
  setIsShowingGame,
  setIsShowingMessage,
  setIsLoggedIn,
} = navbar.actions;
export const {
  setMySessionId,
  setMyUserName,
  setAudioEnabled,
  setVideoEnabled,
  setMsgToSend,
  setChatEvents,
  setEmojiEvents,
} = clientSession.actions;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
