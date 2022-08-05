import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type Channel = {
  id: number;
  name: string;
};
type Channels = ReadonlyArray<Channel>;

const fetchChannels = async (): Promise<Channels> => {
  // const response = await axios.get(
  //   process.env.NEXT_PUBLIC_API_PATH + "/Channel"
  // );

  const response = await axios.get(
    "https://hackathon-backend-kqkvlqlr2a-uc.a.run.app/Channel"
  );

  https: return response.data;
};

/** @package */
export const useGetChannelsQuery = () => {
  return useQuery(["channels"], () => {
    return fetchChannels();
  });
};

const fetchChannel = async (channelId: string): Promise<Channel> => {
  // const response = await axios.get(
  //   process.env.NEXT_PUBLIC_API_PATH + "/Channel/" + channelId
  // );

  const response = await axios.get(
    "https://hackathon-backend-kqkvlqlr2a-uc.a.run.app/Channel" + channelId
  );

  return response.data;
};

/** @package */
export const useGetChannelQuery = (channelId: string) => {
  return useQuery(["channel", channelId], () => {
    return fetchChannel(channelId);
  });
};
