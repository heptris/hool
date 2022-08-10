import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyProfile } from "api/profile";
import { QUERY_KEYS, USER_SESSIONSTORAGE_KEY } from "constant";
import { UserInfoType } from "types/UserInfoType";

const getUserInfo = async (token: string | null) => {
  if (!token) return null;
  return await getMyProfile(token);
};

const useUser = () => {
  const queryClient = useQueryClient();
  const accessToken = sessionStorage.getItem(
    USER_SESSIONSTORAGE_KEY.ACCESS_TOKEN
  );
  const { data: userInfo } = useQuery([QUERY_KEYS.USER], () =>
    getUserInfo(accessToken)
  );

  const updateUser = (newUser: UserInfoType) => {
    queryClient.setQueryData([QUERY_KEYS.USER], newUser);
  };
  const clearUser = () => {
    queryClient.setQueryData([QUERY_KEYS.USER], null);
  };

  return { userInfo, updateUser, clearUser };
};

export default useUser;
