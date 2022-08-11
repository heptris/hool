import {
  postCreateGame,
  postCreateGameHistory,
  postSaveGameResult,
} from "api/meeting";

const useGame = () => {
  const createGame = (obj: { conferenceId: number; gameName: string }) => {
    return postCreateGame(obj);
    // gameId: number
    // gameName: string
  };
  const submitGameVSInfo = (obj: {
    bettChoice: boolean;
    bettPoint: number;
    gameId: number;
    gameStatus: "OVER" | "PROGRESS";
    memberNickName: string;
  }) => {
    postCreateGameHistory(obj);
  };
  const submitGameResult = (obj: { gameId: number; result: boolean }) => {
    postSaveGameResult(obj);
  };

  return { createGame, submitGameResult, submitGameVSInfo };
};

export default useGame;
