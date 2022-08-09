import { getRequest, postRequest } from "api";

const getMeetingList = () => getRequest("");

const createMeetingRoom = async (obj: {
  conferenceCategory: string;
  description: string;
  nickName: string;
  title: string;
}) => postRequest("conference/create", obj);

const enterMeetingRoom = async (obj: {
  conferenceId: number;
  memberId: number;
}) => postRequest("conference/enter", obj);

const modifyMeetingRoom = async (obj: {
  conferenceId: number;
  description: string;
  title: string;
}) => postRequest("conference/modify", obj);

// game controller
const createGame = (obj: { conferenceId: number; gameName: string }) =>
  postRequest("game/create", obj);

const createGameHistory = (obj: {
  bettChoice: boolean;
  bettPoint: number;
  gameId: number;
  gameStatus: "OVER" | "PROGRESS";
  memberNickName: string;
}) => postRequest("game/create/history", obj);

const saveGameResult = (obj: { gameId: number; result: boolean }) =>
  postRequest("game/save/result", obj);

export {
  getMeetingList,
  createMeetingRoom,
  enterMeetingRoom,
  modifyMeetingRoom,
  createGame,
  createGameHistory,
  saveGameResult,
};
