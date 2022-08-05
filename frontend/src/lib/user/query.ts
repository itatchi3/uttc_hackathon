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
  //   const response = await axios.get(process.env.NEXT_PUBLIC_API_PATH + "/User");
  const response = await axios.get(
    "https://hackathon-backend-kqkvlqlr2a-uc.a.run.app/User"
  );
  return response.data;
};

/** @package */
export const useGetUsersQuery = () => {
  return useQuery(["users"], () => {
    return fetchUsers();
  });
};
