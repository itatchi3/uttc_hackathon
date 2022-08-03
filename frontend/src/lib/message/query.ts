import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Message = {
  id: number;
  text: string;
  createdAt: string;
  updatedAt: string;
  user: User;
};

type User = {
  id: number;
  name: string;
  profileURL: string;
};

type Messages = ReadonlyArray<Message>;

axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

const fetchMessages = async (channelId: string): Promise<Messages> => {
  const response = await axios.get(
    process.env.API_PATH + "/Message/" + channelId
  );
  return response.data;
};

export const useGetMessagesQuery = (channelId: string) => {
  return useQuery(["messages", channelId], () => {
    return fetchMessages(channelId);
  });
};
