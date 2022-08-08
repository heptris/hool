import { apiInstance } from "api";

const api = apiInstance();

export const getMeetingList = async () => {
  return await api.get(`conference`).then((res) => res.data);
};
