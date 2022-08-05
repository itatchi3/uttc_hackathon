import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

import { BACKEND_PATH } from "./../const/path";

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
  const response = await axios.get(BACKEND_PATH + "/Messages/" + channelId);
  return response.data;
};

/** @package */
export const useGetMessagesQuery = (channelId: string) => {
  return useQuery(["messages", channelId], () => {
    return fetchMessages(channelId);
  });
};

/** @package */
export const useAddMessageQuery = () => {
  return useMutation(
    (newComment: { text: string; user_id: number; channel_id: number }) => {
      return axios.post(BACKEND_PATH + "/Message", newComment);
    }
  );
};

/** @package */
export const useUpdateMessageQuery = () => {
  return useMutation(
    (newComment: {
      id: number;
      text: string;
      user_id: number;
      channel_id: number;
    }) => {
      return axios.put(BACKEND_PATH + "/Message/" + newComment.id, {
        text: newComment.text,
        user_id: newComment.user_id,
        channel_id: newComment.channel_id,
      });
    }
  );
};

/** @package */
export const useDeleteMessageQuery = () => {
  return useMutation((messageId: number) => {
    return axios.delete(BACKEND_PATH + "/Message/" + messageId);
  });
};
