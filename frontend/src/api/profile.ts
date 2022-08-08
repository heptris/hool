import { getRequest, postRequest, putRequest } from "api";

const getmyEmojiDetail = (obj: { emojiId: number }) =>
  postRequest("detail/emoji", obj);

const getmyEmojiDetailFavorite = (obj: { emojiId: number }) =>
  postRequest("detail/emoji/favorite", obj);

const getMyEmojiList = () => getRequest("my/emoji");

const getMyFavoriteEmoji = () => getRequest("my/favorite/emoji");

const getMyProfile = () => getRequest("myprofile");

const modifyMyProfile = (obj: {
  name: string;
  nickName: string;
  password: string;
}) => putRequest("myprofile", obj);

const checkDuplicateNickName = (obj: { nickName: string }) =>
  postRequest("nickname/check", obj);

const getMyPoint = (obj: { memberId: number }) => postRequest("point", obj);

export {
  modifyMyProfile,
  getmyEmojiDetail,
  getmyEmojiDetailFavorite,
  getMyEmojiList,
  getMyFavoriteEmoji,
  getMyProfile,
  checkDuplicateNickName,
  getMyPoint,
};
