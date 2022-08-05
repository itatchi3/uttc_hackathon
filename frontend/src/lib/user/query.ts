import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { BACKEND_PATH } from "../const/path";

/** @package */
export type User = {
  id: number;
  name: string;
  profile_url: string;
};
type Users = ReadonlyArray<User>;

const fetchUsers = async (): Promise<Users> => {
  const response = await axios.get(BACKEND_PATH + "/User");
  return response.data;
};

/** @package */
export const useGetUsersQuery = () => {
  return useQuery(["users"], () => {
    return fetchUsers();
  });
};
