import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { BACKEND_PATH } from "../const/path";

export type Channel = {
  id: number;
  name: string;
};
type Channels = ReadonlyArray<Channel>;

const fetchChannels = async (): Promise<Channels> => {
  const response = await axios.get(BACKEND_PATH + "/Channel");

  https: return response.data;
};

/** @package */
export const useGetChannelsQuery = () => {
  return useQuery(["channels"], () => {
    return fetchChannels();
  });
};

const fetchChannel = async (channelId: string): Promise<Channel> => {
  const response = await axios.get(BACKEND_PATH + "/Channel" + channelId);

  return response.data;
};

/** @package */
export const useGetChannelQuery = (channelId: string) => {
  return useQuery(["channel", channelId], () => {
    return fetchChannel(channelId);
  });
};
