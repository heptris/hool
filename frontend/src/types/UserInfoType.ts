import { MemberEmojiType } from "./MemberEmojiType";

export interface UserInfoType {
  memberId: number;
  nickName: string;
  memberEmail: string;
  point: number;
  emojiCount: number;
  friendCount: number;
  memberProfile: string;
  memberEmojiList: {
    cursorId: number;
    hasNext: boolean;
    values: MemberEmojiType[];
  };
}
