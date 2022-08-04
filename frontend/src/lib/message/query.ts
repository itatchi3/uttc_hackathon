import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

const fetchMessages = async (channelId: string): Promise<Messages> => {
  const response = await axios.get(
    process.env.NEXT_PUBLIC_API_PATH + "/Messages/" + channelId
  );
  return response.data;
};

export const useGetMessagesQuery = (channelId: string) => {
  return useQuery(["messages", channelId], () => {
    return fetchMessages(channelId);
  });
};

export const useAddMessage = (channelId: string) => {
  const queryClient = useQueryClient();

  return useMutation(
    (newComment: { text: string; user_id: number; channel_id: number }) => {
      return axios.post(
        process.env.NEXT_PUBLIC_API_PATH + "/Message",
        newComment
      );
    },
    {
      onSuccess: () => {
        return queryClient.invalidateQueries(["messages", channelId]);
      },
    }
  );
};
