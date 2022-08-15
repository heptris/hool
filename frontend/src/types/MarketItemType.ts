import { EmojiDetailType } from "./EmojiDetailType";

export interface MarketItemType extends EmojiDetailType {
  price: number;
  url: string;
  creatorId: number;
  emojiShopId: number;
}
