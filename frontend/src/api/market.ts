import { deleteRequest, getRequest, postRequest, putRequest } from "api";

import { BuyEmojiType } from "types/BuyEmojiType";

const EMOJI_SHOP = "emojishop/";

// deal-controller
const postBuyEmoji = (obj: BuyEmojiType) => postRequest("deal", obj);

// emoji-shop-controller
const getMarketList = (cursorId: number, size: number) =>
  getRequest(`${EMOJI_SHOP}list?cursorId=${cursorId}&size=${size}`);

const postMarketItem = (obj: { emojiId: number; price: number }) =>
  postRequest(EMOJI_SHOP, obj);

const putMarketItem = (obj: { emojiShopId: number; updatePrice: number }) =>
  putRequest(EMOJI_SHOP, obj);

const deleteMarketItem = (id: number) =>
  deleteRequest(`${EMOJI_SHOP}?emojiShopId=${id}`);

const getMarketMakeList = (cursorId: number, size: number) =>
  getRequest(`${EMOJI_SHOP}makelist?cursorId=${cursorId}&size=${size}`);

export {
  getMarketList,
  postMarketItem,
  putMarketItem,
  deleteMarketItem,
  postBuyEmoji,
  getMarketMakeList,
};
