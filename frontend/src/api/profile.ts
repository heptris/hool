import { getRequest, postRequest, putRequest } from "api";

const MEMBER = "member";

const getMyProfile = async (token?: string) => {
  return await getRequest(
    `${MEMBER}/`,
    token
      ? {
          headers: { Authorization: `Bearer ${token}` },
        }
      : undefined
  )
    .then(({ data }) => data)
    .catch((err) => console.log(err));
};

const putModifyMyProfile = (obj: {
  name: string;
  nickName: string;
  password: string;
}) => putRequest(`${MEMBER}/`, obj);

const postMyEmojiDetail = (obj: { emojiId: number }) =>
  postRequest(`${MEMBER}/detail/emoji`, obj);

const postMyEmojiDetailFavorite = (obj: { emojiId: number }) =>
  postRequest(`${MEMBER}/detail/emoji/favorite`, obj);

const getMyEmojiList = () => getRequest(`${MEMBER}/my/emoji`);

const getMyFavoriteEmoji = () => getRequest(`${MEMBER}/my/favorite/emoji`);

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
