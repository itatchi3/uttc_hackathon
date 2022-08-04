import type { FC } from "react";
import { useGetMessagesQuery } from "src/lib/message";

type Props = {
  channelId: string;
};

/** @package */
export const Channel: FC<Props> = ({ channelId }) => {
  const messsges = useGetMessagesQuery(channelId);

  return (
    <>
      {messsges.data && (
        <ul>
          {messsges.data.map((message) => {
            return <li key={message.id}>{message.text}</li>;
          })}
        </ul>
      )}
    </>
  );
};
