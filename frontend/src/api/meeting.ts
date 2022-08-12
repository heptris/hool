import { getRequest, postRequest } from "api";
import { CreatingMeetingRoomType } from "types/CreatingMeetingRoomType";
import { GameHistoryType } from "types/GameHistoryType";

// conference-controller
const postCreateMeetingRoom = async (obj: CreatingMeetingRoomType) =>
  postRequest("conference/create", obj);

const postEnterMeetingRoom = async (obj: { conferenceId: number }) =>
  postRequest("conference/enter", obj);

const postCheckPasswordBeforeEnterMeetingRoom = async (obj: {
  conferenceId: number;
  password: string;
}) => postRequest("conference/enter/check", obj);

const postModifyMeetingRoom = async (obj: {
  conferenceId: number;
  description: string;
  title: string;
}) => postRequest("conference/modify", obj);

const postExitMeetingRoom = async (obj: { conferenceId: number }) =>
  postRequest("conference/exit", obj);

// game-controller
const postCreateGame = (obj: { conferenceId: number; gameName: string }) =>
  postRequest("game/create", obj);

const postCreateGameHistory = (obj: GameHistoryType) => {
  console.log(obj);

  return postRequest("game/create/history", obj);
};

const postSaveGameResult = (obj: { gameId: number; result: boolean }) =>
  postRequest("game/save/result", obj);

// main-controller
const getMeetingList = () => getRequest("");

const getMeetingListPage = (cursorId: number, size: number) =>
  getRequest(`page?cursorId=${cursorId}&size=${size}`);

const getMeetingListSearchByCategory = (
  category: "SOCCER" | "BASEBALL" | "BASKETBALL" | "VOLLEYBALL" | "ESPORTS",
  cursorId: number,
  size: number
) =>
  getRequest(`search?category=${category}&cursorId=${cursorId}&size=${size}`);

export {
  getMeetingList,
  postCreateMeetingRoom,
  postEnterMeetingRoom,
  postModifyMeetingRoom,
  postCreateGame,
  postCreateGameHistory,
  postSaveGameResult,
  postExitMeetingRoom,
  postCheckPasswordBeforeEnterMeetingRoom,
  getMeetingListPage,
  getMeetingListSearchByCategory,
};
