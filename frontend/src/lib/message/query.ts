import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type Message = {
  id: number;
  text: string;
  created_at: string;
  updated_at: string;
  User: User;
};

type User = {
  id: number;
  name: string;
  image_url: string;
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

export const useAddMessageQuery = (channelId: string) => {
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

export const useUpdateMessageQuery = (channelId: string) => {
  const queryClient = useQueryClient();

  return useMutation(
    (newComment: {
      id: number;
      text: string;
      user_id: number;
      channel_id: number;
    }) => {
      return axios.put(
        process.env.NEXT_PUBLIC_API_PATH + "/Message/" + newComment.id,
        {
          text: newComment.text,
          user_id: newComment.user_id,
          channel_id: newComment.channel_id,
        }
      );
    },
    {
      onSuccess: () => {
        return queryClient.invalidateQueries(["messages", channelId]);
      },
    }
  );
};

export const useDeleteMessageQuery = (channelId: string) => {
  const queryClient = useQueryClient();

  return useMutation(
    (messageId: number) => {
      return axios.delete(
        process.env.NEXT_PUBLIC_API_PATH + "/Message/" + messageId
      );
    },
    {
      onSuccess: () => {
        return queryClient.invalidateQueries(["messages", channelId]);
      },
    }
  );
};