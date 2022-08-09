import { getRequest, postRequest } from "api";

const postFriendAccept = (obj: { accept: boolean; friendRequestId: number }) =>
  postRequest(`friend/accept`, obj);

const getFriendMessage = () => getRequest("friend/add/message");

const postSendFriendAddMessage = (obj: { friendMemberId: number }) =>
  postRequest("friend/add/message", obj);

const getFriendList = () => getRequest("friendList");

// const inviteFriend = (obj:) 백에서 미개발

const postJoinFriendRoom = (obj: { conferenceId: number; memberId: number }) =>
  postRequest("join/friend/conference", obj);

const postSearchFriend = (obj: { friendNickName: string }) =>
  postRequest("searchFriend", obj);

export {
  postFriendAccept,
  getFriendList,
  getFriendMessage,
  postSearchFriend,
  postSendFriendAddMessage,
  postJoinFriendRoom,
};
