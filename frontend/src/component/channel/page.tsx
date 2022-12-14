import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Group,
  Menu,
  Modal,
  Stack,
  Text,
  Textarea,
  useMantineTheme,
} from "@mantine/core";
import dayjs from "dayjs";
import type { FC } from "react";
import { Fragment } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
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
import {
  DeviceFloppy,
  DotsVertical,
  Edit,
  Send,
  Trash,
  X,
} from "tabler-icons-react";

import { Loading } from "../loading";

type Props = {
  channelId: string;
};

/** @package */
export const Channel: FC<Props> = ({ channelId }) => {
  const messages = useGetMessagesQuery(channelId);
  const channels = useGetChannelsQuery();
  const theme = useMantineTheme();
  const [text, setText] = useState("");
  const addMessage = useAddMessageQuery();
  const updateMessage = useUpdateMessageQuery();
  const deleteMessage = useDeleteMessageQuery();
  const [editingMessage, setEditingMessage] = useState<{
    id: number;
    text: string;
  } | null>(null);
  const [openedID, setOpenedID] = useState<number | null>(null);
  const [channelName, setChannelName] = useRecoilState(channelNameState);
  const loginUser = useRecoilValue(loginUserState);
  const scrollBottomRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    await addMessage.mutateAsync({
      text,
      channel_id: Number(channelId),
      user_id: loginUser.id,
    });
    setText("");
    await messages.refetch();
    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });
    scrollBottomRef.current?.scrollIntoView();
    setIsLoading(false);
  };

  const handleFinishEdit = async (id: number, beforeText: string) => {
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
    await updateMessage.mutateAsync({
      id,
      text: editingMessage.text,
      user_id: loginUser.id,
      channel_id: Number(channelId),
    });
    await messages.refetch();
    setEditingMessage(null);
  };

  const handleDelete = async (id: number) => {
    await deleteMessage.mutateAsync(id);
    await messages.refetch();
    setOpenedID(null);
  };

  const transformNewLine = (text: string) => {
    const texts = text.split(/(\n)/).map((item, index) => {
      return (
        <Fragment key={index}>{item.match(/\n/) ? <br /> : item}</Fragment>
      );
    });
    return texts;
  };

  useEffect(() => {
    if (!channels.data) {
      return;
    }
    const channel = channels.data.find((c: ChanelType) => {
      return c.id === Number(channelId);
    });
    if (!channel) {
      return;
    }
    setChannelName(channel.name);
  }, [channels.data, channelId, setChannelName]);

  useEffect(() => {
    const fetch = async () => {
      scrollBottomRef?.current?.scrollIntoView(false);
      await messages.refetch();
      await new Promise((resolve) => {
        setTimeout(resolve, 0);
      });
      scrollBottomRef?.current?.scrollIntoView(false);
    };
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelId]);

  return messages.data !== undefined ? (
    <Stack
      justify="space-between"
      sx={{
        height: "calc(100vh - 115px)",
      }}
    >
      <Box
        sx={{
          height: "100%",
          overflowY: "scroll",
        }}
      >
        {messages.data &&
          messages.data.map((message, index) => {
            return (
              <Box key={message.id}>
                <Box
                  p="sm"
                  sx={{
                    borderTop: "1px solid #e6e6e6",
                    borderLeft: "1px solid #e6e6e6",
                    borderRight: "1px solid #e6e6e6",
                    borderBottom:
                      index === messages.data.length - 1
                        ? "1px solid #e6e6e6"
                        : "none",
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
                            setEditingMessage({
                              id: message.id,
                              text: message.text,
                            });
                          }}
                        >
                          ??????
                        </Menu.Item>
                        <Menu.Item
                          icon={<Trash size={16} />}
                          onClick={() => {
                            setOpenedID(message.id);
                          }}
                        >
                          ??????
                        </Menu.Item>
                      </Menu>
                    )}
                  </Group>
                  {editingMessage?.id !== message.id ? (
                    <>
                      <Text pt="sm" pl="54px" size="sm">
                        {transformNewLine(message.text)}
                        {message.created_at !== message.updated_at && (
                          <span style={{ color: "gray" }}> (????????????)</span>
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
                          leftIcon={<X size={14} />}
                        >
                          ???????????????
                        </Button>
                        <Button
                          size="xs"
                          onClick={() => {
                            return handleFinishEdit(
                              editingMessage.id,
                              message.text
                            );
                          }}
                          loading={
                            updateMessage.isLoading || messages.isLoading
                          }
                          leftIcon={<DeviceFloppy size={14} />}
                        >
                          ????????????
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
                      ??????????????????????????????
                    </Text>
                  </Group>
                  <Text color="dimmed" size="xs" mb="md">
                    ?????????????????????????????????????????????????????????????????????????????????????????????????????????
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
                      leftIcon={<X size={14} />}
                    >
                      ???????????????
                    </Button>
                    <Button
                      color="red"
                      size="xs"
                      onClick={() => {
                        handleDelete(message.id);
                      }}
                      loading={deleteMessage.isLoading}
                      leftIcon={<Trash size={14} />}
                    >
                      ????????????
                    </Button>
                  </Group>
                </Modal>
              </Box>
            );
          })}
        <div ref={scrollBottomRef} />
      </Box>
      <Box>
        <Textarea
          placeholder={`#${channelName}?????????????????????`}
          autosize
          maxRows={10}
          value={text}
          onChange={(e) => {
            return setText(e.target.value);
          }}
        />
        <Group position="right" pt="12px">
          <Button
            size="xs"
            color={theme.primaryColor}
            variant="filled"
            onClick={handleClick}
            loading={isLoading}
            disabled={!text}
            leftIcon={<Send size={14} />}
          >
            ??????
          </Button>
        </Group>
      </Box>
    </Stack>
  ) : (
    <Loading />
  );
};
