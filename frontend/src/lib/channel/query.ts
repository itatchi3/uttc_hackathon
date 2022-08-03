import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Channel = {
  id: number;
  name: string;
};
type Channels = ReadonlyArray<Channel>;

axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

const fetchChannels = async (): Promise<Channels> => {
  const response = await axios.get(process.env.API_PATH);
  return response.data;
};

export const useGetChannelsQuery = () => {
  return useQuery(["channels"], () => {
    return fetchChannels();
  });
};
