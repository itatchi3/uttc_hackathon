import { useQuery } from "@tanstack/react-query";
import axios from "axios";

/** @package */
export type User = {
  id: number;
  name: string;
  profile_url: string;
};
type Users = ReadonlyArray<User>;

const fetchUsers = async (): Promise<Users> => {
  const response = await axios.get(process.env.NEXT_PUBLIC_API_PATH + "/User");
  return response.data;
};

/** @package */
export const useGetUsersQuery = () => {
  return useQuery(["users"], () => {
    return fetchUsers();
  });
};
