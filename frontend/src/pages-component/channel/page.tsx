import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Group,
  Menu,
  Modal,
  Text,
  Textarea,
  useMantineTheme,
} from "@mantine/core";
import { IconArrowRight } from "@tabler/icons";
import dayjs from "dayjs";
import type { FC } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { useRecoilValue } from "recoil";
import type { Channel as ChanelType } from "src/lib/channel";
import { channelNameState } from "src/lib/channel";
import { useGetChannelsQuery } from "src/lib/channel";
import {
  useAddMessageQuery,
  useDeleteMessageQuery,
  useGetMessagesQuery,
  useUpdateMessageQuery,
} from "src/lib/message";
import { loginUserState } from "src/lib/user";
import { DotsVertical, Edit, Trash } from "tabler-icons-react";

type Props = {
  channelId: string;
};

/** @package */
export const Channel: FC<Props> = ({ channelId }) => {
  const messsges = useGetMessagesQuery(channelId);
  const chanels = useGetChannelsQuery();
  const theme = useMantineTheme();
  const [text, setText] = useState("");
  const addMessage = useAddMessageQuery(channelId);
  const updateMessage = useUpdateMessageQuery(channelId);
  const deleteMessage = useDeleteMessageQuery(channelId);
  const [editingMessage, setEditingMessage] = useState<{
    id: number;
    text: string;
  } | null>(null);
  const [openedID, setOpenedID] = useState<number | null>(null);
  const setChannelName = useSetRecoilState(channelNameState);
  const loginUser = useRecoilValue(loginUserState);

  const channelName = useMemo(() => {
    const channel = chanels.data?.find((c: ChanelType) => {
      return c.id === Number(channelId);
    });
    return channel?.name;
  }, [channelId, chanels.data]);

  const handleClick = () => {
    addMessage.mutate({
      text,
      channel_id: Number(channelId),
      user_id: loginUser.id,
    });
    setText("");
  };

  const handleFinishEdit = (id: number, beforeText: string) => {
    if (editingMessage === null) {
      return;
    }
    if (editingMessage.text === beforeText) {
      setEditingMessage(null);
      return;
    }
    if (editingMessage.text === "") {
      setOpenedID(id);
    }
    updateMessage.mutate({
      id,
      text: editingMessage.text,
      user_id: loginUser.id,
      channel_id: Number(channelId),
    });
    setEditingMessage(null);
  };

  useEffect(() => {
    if (!chanels.data) {
      return;
    }
    const channel = chanels.data.find((c: ChanelType) => {
      return c.id === Number(channelId);
    });
    if (!channel) {
      return;
    }
    setChannelName(channel.name);
  }, [chanels.data, channelId, setChannelName]);

  return (
    <Box sx={{ position: "relative", height: "100%" }}>
      {messsges.data && (
        <>
          {messsges.data.map((message) => {
            return (
              <>
                <Box
                  key={message.id}
                  p="sm"
                  sx={{
                    borderTop: "1px solid #e6e6e6",
                  }}
                >
                  <Group position="apart">
                    <Group>
                      <Avatar
                        src={message.User.image_url}
                        alt={message.User.name}
                        radius="xl"
                      />
                      <div>
                        <Text size="sm" weight={700}>
                          {message.User.name}
                        </Text>
                        <Text size="xs" color="dimmed">
                          {dayjs(message.created_at).format(
                            "YYYY-MM-DD HH:mm:ss"
                          )}
                        </Text>
                      </div>
                    </Group>
                    {message.User.id === loginUser.id && (
                      <Menu
                        size="xs"
                        position="bottom"
                        placement="end"
                        transition="pop-top-right"
                        control={
                          <ActionIcon variant="hover" radius="xl" size={20}>
                            <DotsVertical radius="xl" />
                          </ActionIcon>
                        }
                        styles={(theme) => {
                          return {
                            label: { fontSize: theme.fontSizes.sm },
                            itemLabel: { fontSize: theme.fontSizes.md },
                          };
                        }}
                      >
                        <Menu.Item
                          icon={<Edit size={16} />}
                          onClick={() => {
                            return setEditingMessage({
                              id: message.id,
                              text: message.text,
                            });
                          }}
                        >
                          編集
                        </Menu.Item>
                        <Menu.Item
                          icon={<Trash size={16} />}
                          onClick={() => {
                            setOpenedID(message.id);
                          }}
                        >
                          削除
                        </Menu.Item>
                      </Menu>
                    )}
                  </Group>
                  {editingMessage?.id !== message.id ? (
                    <>
                      <Text pt="sm" pl="54px" size="sm">
                        {message.text}
                        {message.created_at !== message.updated_at && (
                          <span style={{ color: "gray" }}> (編集済み)</span>
                        )}
                      </Text>
                    </>
                  ) : (
                    <>
                      <Textarea
                        pt="md"
                        pl="54px"
                        pr="24px"
                        autosize
                        maxRows={10}
                        value={editingMessage.text}
                        onChange={(e) => {
                          return setEditingMessage({
                            id: message.id,
                            text: e.target.value,
                          });
                        }}
                      />
                      <Group position="right" pt="sm" pr="xl">
                        <Button
                          size="xs"
                          color="gray"
                          variant="outline"
                          onClick={() => {
                            return setEditingMessage(null);
                          }}
                        >
                          キャンセル
                        </Button>
                        <Button
                          size="xs"
                          onClick={() => {
                            return handleFinishEdit(
                              editingMessage.id,
                              message.text
                            );
                          }}
                        >
                          保存する
                        </Button>
                      </Group>
                    </>
                  )}
                </Box>
                <Modal
                  opened={openedID === message.id}
                  onClose={() => {
                    return setOpenedID(null);
                  }}
                >
                  <Group position="apart" mb="xs">
                    <Text size="md" weight={500}>
                      メッセージを削除する
                    </Text>
                  </Group>
                  <Text color="dimmed" size="xs" mb="md">
                    このメッセージを本当に削除しますか？削除後は元に戻すことはできません。
                  </Text>
                  <Box p="sm" mb="lg" sx={{ border: "1px solid #e6e6e6" }}>
                    <Group>
                      <Avatar
                        src={message.User.image_url}
                        alt={message.User.name}
                        radius="xl"
                      />
                      <div>
                        <Text size="sm" weight={700}>
                          {message.User.name}
                        </Text>
                        <Text size="xs" color="dimmed">
                          {message.created_at}
                        </Text>
                      </div>
                    </Group>
                    <Text pt="sm" pl="54px" size="sm">
                      {message.text}
                    </Text>
                  </Box>
                  <Group position="right" mt="xs">
                    <Button
                      variant="outline"
                      color="gray"
                      size="xs"
                      onClick={() => {
                        setOpenedID(null);
                      }}
                    >
                      キャンセル
                    </Button>
                    <Button
                      color="red"
                      size="xs"
                      onClick={() => {
                        deleteMessage.mutate(message.id);
                      }}
                    >
                      削除する
                    </Button>
                  </Group>
                </Modal>
              </>
            );
          })}
        </>
      )}
      <Box>
        <Textarea
          placeholder={`#${channelName}へのメッセージ`}
          autosize
          maxRows={10}
          value={text}
          onChange={(e) => {
            return setText(e.target.value);
          }}
        />
        <Group position="right" pt="8px">
          <Button
            size="xs"
            color={theme.primaryColor}
            variant="filled"
            onClick={handleClick}
          >
            <IconArrowRight size={18} stroke={1.5} />
          </Button>
        </Group>
      </Box>
    </Box>
  );
};
