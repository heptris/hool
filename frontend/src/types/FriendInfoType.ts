interface FriendInfoType {
  friendMemberEmail: string;
  friendNickName: string;
  friendMemberId: number;
  friendProfile: string;
  memberStatus: string;
}
export interface FriendRequestInfoType extends FriendInfoType {
  friendRequestId?: number;
}
export interface MyFriendInfoType extends FriendInfoType {
  last?: string;
  friendConferenceDto?: {
    friendConferenceId: number;
    friendConferenceTitle: string;
  };
}
