import { deleteRequest, getRequest, postRequest, putRequest } from "api";

import { BuyEmojiType } from "types/BuyEmojiType";

const EMOJI_SHOP = "emojishop/";

// deal-controller
const postBuyEmoji = (obj: BuyEmojiType) => postRequest("deal", obj);

// emoji-shop-controller
const getMarketList = () => getRequest(`${EMOJI_SHOP}list`);

const getMarketListPage = (cursorId = 2, size = 10) =>
  getRequest(`${EMOJI_SHOP}list/page?cursorId=${cursorId}&size=${size}`);

const postMarketItem = (obj: { emojiId: number; price: number }) =>
  postRequest(EMOJI_SHOP, obj);

const putMarketItem = (obj: { emojiShopId: number; updatePrice: number }) =>
  putRequest(EMOJI_SHOP, obj);

const deleteMarketItem = (id: number) =>
  deleteRequest(`${EMOJI_SHOP}?emojiShopId=${id}`);

const getMarketMakeList = () => getRequest(`${EMOJI_SHOP}makelist`);

const getMarketMakeListPage = (cursorId = 1, size = 10) =>
  getRequest(`${EMOJI_SHOP}makelist?cursorId=${cursorId}&size=${size}`);

export {
  getMarketList,
  postMarketItem,
  putMarketItem,
  deleteMarketItem,
  postBuyEmoji,
  getMarketMakeList,
  getMarketMakeListPage,
  getMarketListPage,
};
