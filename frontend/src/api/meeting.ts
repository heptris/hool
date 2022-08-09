import { getRequest, postRequest } from "api";

const getMeetingList = () => getRequest("");

const postCreateMeetingRoom = async (obj: {
  conferenceCategory: string;
  description: string;
  title: string;
}) => postRequest("conference/create", obj);

const postEnterMeetingRoom = async (obj: {
  conferenceId: number;
  memberId: number;
}) => postRequest("conference/enter", obj);

const postModifyMeetingRoom = async (obj: {
  conferenceId: number;
  description: string;
  title: string;
}) => postRequest("conference/modify", obj);

// game controller
const postCreateGame = (obj: { conferenceId: number; gameName: string }) =>
  postRequest("game/create", obj);

const postCreateGameHistory = (obj: {
  bettChoice: boolean;
  bettPoint: number;
  gameId: number;
  gameStatus: "OVER" | "PROGRESS";
  memberNickName: string;
}) => postRequest("game/create/history", obj);

const postSaveGameResult = (obj: { gameId: number; result: boolean }) =>
  postRequest("game/save/result", obj);

export {
  getMeetingList,
  postCreateMeetingRoom,
  postEnterMeetingRoom,
  postModifyMeetingRoom,
  postCreateGame,
  postCreateGameHistory,
  postSaveGameResult,
};
