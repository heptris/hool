import { getRequest, postRequest, putRequest } from "api";

const postMyEmojiDetail = (obj: { emojiId: number }) =>
  postRequest("detail/emoji", obj);

const postMyEmojiDetailFavorite = (obj: { emojiId: number }) =>
  postRequest("detail/emoji/favorite", obj);

const getMyEmojiList = () => getRequest("my/emoji");

const getMyFavoriteEmoji = () => getRequest("my/favorite/emoji");

const getMyProfile = () => getRequest("myprofile");

const putModifyMyProfile = (obj: {
  name: string;
  nickName: string;
  password: string;
}) => putRequest("myprofile", obj);

const postCheckDuplicateNickName = (obj: { nickName: string }) =>
  postRequest("nickname/check", obj);

const getMyPoint = (obj: { memberId: number }) => postRequest("point", obj);

export {
  putModifyMyProfile,
  postMyEmojiDetail,
  postMyEmojiDetailFavorite,
  getMyEmojiList,
  getMyFavoriteEmoji,
  getMyProfile,
  postCheckDuplicateNickName,
  getMyPoint,
};
