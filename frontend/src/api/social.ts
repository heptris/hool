import { getRequest, postRequest } from "api";

const friendAccept = (obj: { accept: boolean; friendRequestId: number }) =>
  postRequest(`friend/accept`, obj);

const getFriendMessage = () => getRequest("friend/add/message");

const sendFriendAddMessage = (obj: { friendMemberId: number }) =>
  postRequest("friend/add/message", obj);

const getFriendList = () => getRequest("friendList");

// const inviteFriend = (obj:) 백에서 미개발

const joinFriendRoom = (obj: { conferenceId: number; memberId: number }) =>
  postRequest("join/friend/conference", obj);

const searchFriend = (obj: { friendNickName: string }) =>
  postRequest("searchFriend", obj);

export {
  friendAccept,
  getFriendList,
  getFriendMessage,
  searchFriend,
  sendFriendAddMessage,
  joinFriendRoom,
};
