import { Button, Textarea, useMantineTheme } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons";
import type { FC } from "react";
import { useState } from "react";
import { useAddMessage, useGetMessagesQuery } from "src/lib/message";

type Props = {
  channelId: string;
};

/** @package */
export const Channel: FC<Props> = ({ channelId }) => {
  const messsges = useGetMessagesQuery(channelId);
  const theme = useMantineTheme();
  const [text, setText] = useState("");
  const addMessage = useAddMessage(channelId);

  const handleClick = () => {
    addMessage.mutate({ text, channel_id: Number(channelId), user_id: 1 });
    setText("");
  };

  return (
    <>
      {messsges.data && (
        <ul>
          {messsges.data.map((message) => {
            return <li key={message.id}>{message.text}</li>;
          })}
        </ul>
      )}
      <Textarea
        placeholder={`#${channelId}へのメッセージ`}
        autosize
        maxRows={10}
        value={text}
        onChange={(e) => {
          return setText(e.target.value);
        }}
      />
      <Button
        size="xs"
        color={theme.primaryColor}
        variant="filled"
        onClick={handleClick}
      >
        <IconArrowRight size={18} stroke={1.5} />
      </Button>
    </>
  );
};
