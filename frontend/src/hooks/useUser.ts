import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyProfile } from "api/profile";
import { QUERY_KEYS } from "constant";
import { UserInfoType } from "types/UserInfoType";

const useUser = () => {
  const queryClient = useQueryClient();
  useQuery([QUERY_KEYS.USER], getMyProfile);
  const updateUser = (newUser: UserInfoType) => {
    queryClient.setQueryData([QUERY_KEYS.USER], newUser);
  };
  const clearUser = () => {
    queryClient.setQueryData([QUERY_KEYS.USER], null);
  };
  return { updateUser, clearUser };
};

export default useUser;
