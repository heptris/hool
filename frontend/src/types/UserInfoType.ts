export interface UserInfoType {
  memberId: number;
  nickName: string;
  memberEmail: string;
  point: number;
  emojiCount: number;
  friendCount: number;
  memberEmojiDtoList: {
    emojiId: number;
    emojiUrl: string;
  }[];
}
