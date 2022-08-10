import { getRequest, postRequest } from "api";

const FRIEND = "friend";

const postAcceptFriend = (obj: { accept: boolean; friendRequestId: number }) =>
  postRequest(`${FRIEND}/accept`, obj);

const postInviteFriend = () => postRequest(`${FRIEND}/invite`, {});

const postJoinFriendRoom = (obj: { conferenceId: number }) =>
  postRequest(`${FRIEND}/join/conference`, obj);

const getFriendList = () => getRequest(`${FRIEND}/list`);

const postSearchFriend = (obj: { friendNickName: string }) =>
  postRequest(`${FRIEND}/search`, obj);

const getFriendSendMessage = () => getRequest(`${FRIEND}/send/message`);

const postSendFriendSendMessage = (obj: { friendMemberId: number }) =>
  postRequest(`${FRIEND}/send/message`, obj);

export {
  getFriendList,
  postSearchFriend,
  postJoinFriendRoom,
  getFriendSendMessage,
  postAcceptFriend,
  postInviteFriend,
  postSendFriendSendMessage,
};
