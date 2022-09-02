import { getRequest, postRequest } from "api";

const FRIEND = "/friend";

// friend-controller
const postJoinFriendRoom = (obj: { conferenceId: number }) =>
  postRequest(`${FRIEND}/join/conference`, obj);

const getFriendList = () => getRequest(`${FRIEND}/list`);

const getFriendListPage = (friendCursorTime: number, size: number) =>
  getRequest(
    `${FRIEND}/list/page?friendCursorTime=${friendCursorTime}&size=${size}`
  );

const postSearchFriend = (obj: { friendNickName: string }) =>
  postRequest(`${FRIEND}/search`, obj);

// friend-request-controller
const postAcceptFriend = (obj: { accept: boolean; friendRequestId: number }) =>
  postRequest(`${FRIEND}/request/accept`, obj);

const getFriendSendMessage = () => getRequest(`${FRIEND}/request/send/message`);

const postSendFriendSendMessage = (obj: { friendMemberId: number }) =>
  postRequest(`${FRIEND}/request/send/message`, obj);

const getFriendRequestSendMessagePage = (
  friendRequestCursorId: number,
  size: number
) =>
  getRequest(
    `${FRIEND}/request/send/message/page?friendRequestCursorId=${friendRequestCursorId}&size=${size}`
  );

export {
  getFriendList,
  postSearchFriend,
  postJoinFriendRoom,
  getFriendSendMessage,
  postAcceptFriend,
  postSendFriendSendMessage,
  getFriendListPage,
  getFriendRequestSendMessagePage,
};
