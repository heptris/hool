import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Device } from "openvidu-browser";

interface NavMode {
  navMode: "default" | "meetingRoom" | "unseen";
  isCreatingRoom: boolean;
  isCreatingGame: boolean;
  isCreatingPreferences: boolean;
  isShowingGame: boolean;
  isShowingMessage: boolean;
  isResultMode: boolean;
  isShowingGameSubmit: boolean;
}
export type ClientSessionType = {
  mySessionTitle: string;
  mySessionId: string;
  myUserName: string;
  audioEnabled: boolean;
  videoEnabled: boolean;
  msgToSend: string;
  emojiEvents: Array<string>;
  chatEvents: Array<string>;
  isDisplayEmoji: boolean;
  currentVideoDevice?: Device | undefined;
  isPublic: boolean;
  isHost: boolean;
};
const initialState: NavMode = {
  navMode: "default",
  isCreatingRoom: false,
  isCreatingGame: false,
  isCreatingPreferences: false,
  isShowingGame: false,
  isShowingMessage: false,
  isResultMode: false,
  isShowingGameSubmit: false,
};
const sessionInitialState: ClientSessionType = {
  mySessionTitle: "",
  mySessionId: "",
  myUserName: "",
  audioEnabled: false,
  videoEnabled: false,
  msgToSend: "",
  emojiEvents: new Array(9).fill(""),
  chatEvents: new Array(),
  isDisplayEmoji: false,
  currentVideoDevice: undefined,
  isPublic: true,
  isHost: false,
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
    setIsCreatingPreferences(state: NavMode, actions: PayloadAction<boolean>) {
      state.isCreatingPreferences = actions.payload;
    },
    setIsShowingGame(state: NavMode, actions: PayloadAction<boolean>) {
      state.isShowingGame = actions.payload;
    },
    setIsShowingMessage(state: NavMode, actions: PayloadAction<boolean>) {
      state.isShowingMessage = actions.payload;
    },
    setIsResultMode(state: NavMode, actions: PayloadAction<boolean>) {
      state.isResultMode = actions.payload;
    },
    setIsShowingGameSubmit(state: NavMode, actions: PayloadAction<boolean>) {
      state.isShowingGameSubmit = actions.payload;
    },
  },
});
const clientSession = createSlice({
  name: "clientSession",
  initialState: sessionInitialState,
  reducers: {
    setMySessionTitle(
      state: ClientSessionType,
      actions: PayloadAction<string>
    ) {
      state.mySessionTitle = actions.payload;
    },
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
    setIsDisplayEmoji(
      state: ClientSessionType,
      actions: PayloadAction<boolean>
    ) {
      state.isDisplayEmoji = actions.payload;
    },
    setIsPublic(state: ClientSessionType, actions: PayloadAction<boolean>) {
      state.isPublic = actions.payload;
    },
    setIsHost(state: ClientSessionType, actions: PayloadAction<boolean>) {
      state.isHost = actions.payload;
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
  setIsCreatingPreferences,
  setIsShowingGame,
  setIsShowingMessage,
  setIsResultMode,
  setIsShowingGameSubmit,
} = navbar.actions;
export const {
  setMySessionTitle,
  setMySessionId,
  setMyUserName,
  setAudioEnabled,
  setVideoEnabled,
  setMsgToSend,
  setChatEvents,
  setEmojiEvents,
  addChatEvents,
  addEmojiEvents,
  setIsDisplayEmoji,
  setIsPublic,
  setIsHost,
} = clientSession.actions;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
