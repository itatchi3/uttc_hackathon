import { useMutation, useQuery } from "@tanstack/react-query";
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
  //   const response = await axios.get(
  //     process.env.NEXT_PUBLIC_API_PATH + "/Messages/" + channelId
  //   );
  const response = await axios.get(
    "https://hackathon-backend-kqkvlqlr2a-uc.a.run.app/Messages/" + channelId
  );
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
  //   const queryClient = useQueryClient();

  return useMutation(
    (newComment: { text: string; user_id: number; channel_id: number }) => {
      //   return axios.post(
      //     process.env.NEXT_PUBLIC_API_PATH + "/Message",
      //     newComment
      //   );
      return axios.post(
        "https://hackathon-backend-kqkvlqlr2a-uc.a.run.app/Message",
        newComment
      );
    }
    // {
    //   onSuccess: () => {
    //     return queryClient.invalidateQueries(["messages", channelId]);
    //   },
    // }
  );
};

/** @package */
export const useUpdateMessageQuery = () => {
  //   const queryClient = useQueryClient();

  return useMutation(
    (newComment: {
      id: number;
      text: string;
      user_id: number;
      channel_id: number;
    }) => {
      //   return axios.put(
      //     process.env.NEXT_PUBLIC_API_PATH + "/Message/" + newComment.id,
      //     {
      //       text: newComment.text,
      //       user_id: newComment.user_id,
      //       channel_id: newComment.channel_id,
      //     }
      //   );
      return axios.put(
        "https://hackathon-backend-kqkvlqlr2a-uc.a.run.app/Message/" +
          newComment.id,
        {
          text: newComment.text,
          user_id: newComment.user_id,
          channel_id: newComment.channel_id,
        }
      );
    }
    // {
    //   onSuccess: () => {
    //     return queryClient.invalidateQueries(["messages", channelId]);
    //   },
    // }
  );
};

/** @package */
export const useDeleteMessageQuery = () => {
  //   const queryClient = useQueryClient();

  return useMutation(
    (messageId: number) => {
      //   return axios.delete(
      //     process.env.NEXT_PUBLIC_API_PATH + "/Message/" + messageId
      //   );
      return axios.delete(
        "https://hackathon-backend-kqkvlqlr2a-uc.a.run.app/Message/" + messageId
      );
    }
    // {
    //   onSuccess: () => {
    //     return queryClient.invalidateQueries(["messages", channelId]);
    //   },
    // }
  );
};
