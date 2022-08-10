import { deleteRequest, getRequest, postRequest, putRequest } from "api";

import { BuyEmojiType } from "types/BuyEmojiType";

const EMOJI_SHOP = "emojishop/";

const getMarketList = () => getRequest(`${EMOJI_SHOP}list`);

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

const postBuyEmoji = (obj: BuyEmojiType) => postRequest("deal", obj);

const getMarketMakeList = () => getRequest(`${EMOJI_SHOP}makelist`);

export {
  getMarketList,
  postMarketItem,
  putMarketItem,
  deleteMarketItem,
  postBuyEmoji,
  getMarketMakeList,
};
