import { deleteRequest, getRequest, postRequest, putRequest } from "api";

const EMOJI_SHOP = "emoji_shop";

const getMarketList = () => getRequest(`${EMOJI_SHOP}/list`);

const postMarketItem = (obj: { emojiId: number; price: number }) =>
  postRequest(EMOJI_SHOP, obj);

const putMarketItem = (obj: {
  emojiShopId: number;
  memberId: number;
  updatePrice: number;
}) => putRequest(EMOJI_SHOP, obj);
// deleteRequest
// api/emoji_shop?emojiShopId=1
const deleteMarketItem = (id: number) =>
  deleteRequest(`${EMOJI_SHOP}?emojiShopId=${id}`);

const buyEmoji = (obj: {
  buyerMemberId: number;
  dealPoint: number;
  emojiShopId: number;
  sellerMemberId: number;
}) => postRequest("deal", obj);

export {
  getMarketList,
  postMarketItem,
  putMarketItem,
  deleteMarketItem,
  buyEmoji,
};
