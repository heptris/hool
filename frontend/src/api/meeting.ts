import { getRequest, postRequest } from "api";
import { CreatingMeetingRoomType } from "types/CreatingMeetingRoomType";

const getMeetingList = () => getRequest("");

const postCreateMeetingRoom = async (obj: CreatingMeetingRoomType) =>
  postRequest("conference/create", obj);

const postEnterMeetingRoom = async (obj: {
  conferenceId: number;
  memberId: number;
}) => postRequest("conference/enter", obj);

const postModifyMeetingRoom = async (obj: {
  conferenceId: number;
  description: string;
  title: string;
}) => postRequest("conference/modify", obj);

const postExitMeetingRoom = async (obj: { conferenceId: number }) =>
  postRequest("conference/exit", obj);

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
  postExitMeetingRoom,
};
