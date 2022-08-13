import { getRequest, postRequest, putRequest } from "api";

const MEMBER = "member";

// point-controller
const getMyPoint = (obj: { memberId: number }) => postRequest("point", obj);

// member controller
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
}) => putRequest(`${MEMBER}/`, obj);

const postMyEmojiDetail = (obj: { emojiId: number }) =>
  postRequest(`${MEMBER}/detail/emoji`, obj);

const postMyEmojiDetailFavorite = (obj: { emojiId: number }) =>
  postRequest(`${MEMBER}/detail/emoji/favorite`, obj);

const getMyEmojiList = () => getRequest(`${MEMBER}/my/emoji`);

const getMyEmojiListPage = (emojiCursorId: number, size: number) =>
  getRequest(
    `${MEMBER}/my/emoji/page?emojiCursorId=${emojiCursorId}&size=${size}`
  );

const getMyFavoriteEmoji = () => getRequest(`${MEMBER}/my/favorite/emoji`);

const getMyFavoriteEmojiPage = (emojiFavCursorId: number, size: number) =>
  getRequest(
    `${MEMBER}/my/favorite/emoji/page?emojiFavCursorId=${emojiFavCursorId}&size=${size}`
  );

// const postCheckDuplicateNickName = (obj: { nickName: string }) =>
//   postRequest("nickname/check", obj);

export {
  putModifyMyProfile,
  postMyEmojiDetail,
  postMyEmojiDetailFavorite,
  getMyEmojiList,
  getMyFavoriteEmoji,
  getMyProfile,
  // postCheckDuplicateNickName,
  getMyPoint,
  getMyEmojiListPage,
  getMyFavoriteEmojiPage,
};
