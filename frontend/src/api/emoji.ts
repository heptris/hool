import { deleteRequest, getRequest, postRequest, putRequest } from "api";

const EMOJI = "/emoji";

// emoji-controller
const getEmojiList = () => getRequest(`${EMOJI}/list`);

const postEmoji = (obj: {
  description: string;
  name: string;
  imgUrl: string;
}) => postRequest(EMOJI, obj);

const putEmoji = (obj: {
  emojiId: number;
  memberId: number;
  updateDes: string;
  updateName: string;
}) => putRequest(EMOJI, obj);

const deleteEmoji = (obj: { emojiId: number }) => deleteRequest(EMOJI, obj);

export { getEmojiList, postEmoji, putEmoji, deleteEmoji };
