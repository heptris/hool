export const ROUTES_NAME = {
  FIND: "/auth/find",
  LOGIN: "/auth/login",
  SIGNUP: "/auth/find",
  MEETING: "/meeting",
  MEETING_ROOM: "/meeting/:id",
  MAIN: "/",
  ERROR: "/error",
  MARKET: "/market",
  PROFILE: "/profile",
  SOCIAL: "/social",
};

const PROTOCOL = "https://";
export const HOST = PROTOCOL + "hool-app.link";
export const HOOL_API_ENDPOINT = HOST + "/api";
export const HOOL_AUTH_ENDPOINT = HOST + "/auth";
export const HOOL_IMAGE_ENDPOINT = HOST + "/image";

export const QUERY_KEYS = {
  USER: "user",
  FRIEND_LIST: "friend-list",
  FRIEND_MESSAGE_LIST: "friend-message-list",
  MARKET: "market",
  MEETING_LIST_PAGE: "meeting-list-page",
  POINT: "point",
  MARKET_UPLOAD_ITEM: "market-upload-item",
  MY_OWN_EMOJI_LIST: "my-own-emoji-list",
  MY_FAV_EMOJI_LIST: "my-fav-emoji-list",
  ROOM_ACCESS: "room-access",
  MARKET_SEARCHED_LIST: "market-searched-list",
  MARKET_RANK_LIST: " market-rank-list",
};

export const USER_AUTH_KEY = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
};
