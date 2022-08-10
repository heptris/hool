import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
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
  leaveSessionTrigger: boolean;
  currentVideoDevice?: Object | undefined;
};
const initialState: NavMode = {
  navMode: "default",
  isCreatingRoom: false,
  isCreatingGame: false,
  isShowingGame: false,
  isShowingMessage: false,
  isLoggedIn: !!sessionStorage.getItem("token"),
};
const sessionInitialState: ClientSessionType = {
  mySessionId: "SessionABC",
  myUserName: "Yan",
  audioEnabled: false,
  videoEnabled: false,
  msgToSend: "",
  emojiEvents: new Array(9).fill(""),
  chatEvents: new Array(),
  leaveSessionTrigger: false,
  currentVideoDevice: undefined,
};
const navbar = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    setNavMode(
      state: NavMode,
      actions: PayloadAction<"default" | "meetingRoom" | "unseen">
    ) {
      state.navMode = actions.payload;
    },
    setIsCreatingRoom(state: NavMode, actions: PayloadAction<boolean>) {
      state.isCreatingRoom = actions.payload;
    },
    setIsCreatingGame(state: NavMode, actions: PayloadAction<boolean>) {
      state.isCreatingGame = actions.payload;
    },
    setIsShowingGame(state: NavMode, actions: PayloadAction<boolean>) {
      state.isShowingGame = actions.payload;
    },
    setIsShowingMessage(state: NavMode, actions: PayloadAction<boolean>) {
      state.isShowingMessage = actions.payload;
    },
    setIsLoggedIn(state: NavMode, actions: PayloadAction<boolean>) {
      state.isLoggedIn = actions.payload;
    },
  },
});
const clientSession = createSlice({
  name: "clientSession",
  initialState: sessionInitialState,
  reducers: {
    setMySessionId(state: ClientSessionType, actions: PayloadAction<string>) {
      state.mySessionId = actions.payload;
    },
    setMyUserName(state: ClientSessionType, actions: PayloadAction<string>) {
      state.myUserName = actions.payload;
    },
    setAudioEnabled(state: ClientSessionType, actions: PayloadAction<boolean>) {
      state.audioEnabled = actions.payload;
    },
    setVideoEnabled(state: ClientSessionType, actions: PayloadAction<boolean>) {
      state.videoEnabled = actions.payload;
    },
    setMsgToSend(state: ClientSessionType, actions: PayloadAction<string>) {
      state.msgToSend = actions.payload;
    },
    setChatEvents(
      state: ClientSessionType,
      actions: PayloadAction<Array<string>>
    ) {
      state.chatEvents = actions.payload;
    },
    setEmojiEvents(
      state: ClientSessionType,
      actions: PayloadAction<Array<string>>
    ) {
      state.emojiEvents = actions.payload;
    },
    addChatEvents(state: ClientSessionType, actions: PayloadAction<string>) {
      state.chatEvents = [...state.chatEvents, actions.payload];
    },
    addEmojiEvents(state: ClientSessionType, actions: PayloadAction<string>) {
      state.emojiEvents = [...state.emojiEvents, actions.payload];
    },
    setLeaveSessionTrigger(
      state: ClientSessionType,
      actions: PayloadAction<boolean>
    ) {
      state.leaveSessionTrigger = actions.payload;
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
  addChatEvents,
  addEmojiEvents,
  setLeaveSessionTrigger,
} = clientSession.actions;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
