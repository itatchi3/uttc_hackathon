import { ActionIcon, Avatar, Box, Group, Menu, Title } from "@mantine/core";
import type { FC, ReactNode } from "react";
import { useRecoilValue } from "recoil";
import { useRecoilState } from "recoil";
import { channelNameState } from "src/lib/channel";
import { loginUserState } from "src/lib/user";

/** @package */
export const Header: FC<{ left: ReactNode }> = ({ left }) => {
  return (
    <Box
      component="header"
      sx={(theme) => {
        return {
          padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
          borderBottom: `1px solid ${theme.colors.gray[2]}`,
          backgroundColor: theme.white,
        };
      }}
    >
      <Group spacing="lg" noWrap>
        {left}
        <ChannelName />
        {/* <Notification /> */}
        <UserMenu />
      </Group>
    </Box>
  );
};

// const SearchForm: FC = () => {
//   return (
//     <Autocomplete
//       data={[]}
//       size="lg"
//       placeholder="Search"
//       icon={<Search size={18} />}
//       styles={{
//         root: { flexGrow: 1 },
//         input: { border: 0, backgroundColor: "transparent" },
//       }}
//       onChange={(value) => {
//         console.info(value);
//       }}
//     />
//   );
// };

const ChannelName: FC = () => {
  const channelName = useRecoilValue(channelNameState);
  return (
    <Box sx={{ width: "100%" }}>
      <Title order={1}>{channelName}</Title>
    </Box>
  );
};

// const Notification: FC = () => {
//   return (
//     <Indicator inline size={14} offset={4} color="red" withBorder>
//       <Link href={getPath("NOTIFICATION")} passHref>
//         <ActionIcon component="a" variant="hover" radius="xl" size={40}>
//           <Bell />
//         </ActionIcon>
//       </Link>
//     </Indicator>
//   );
// };

const USER = {
  JACK: {
    id: 1,
    name: "jack",
    imageURL:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
  },
  ITATCHI: {
    id: 2,
    name: "itatchi",
    imageURL: "https://avatars.githubusercontent.com/u/72689870?v=4",
  },
};

const UserMenu: FC = () => {
  const [user, setUser] = useRecoilState(loginUserState);

  return (
    <Menu
      size="lg"
      position="bottom"
      placement="end"
      transition="pop-top-right"
      control={
        <ActionIcon variant="hover" radius="xl" size={40}>
          <Avatar
            src={user.imageURL}
            // src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
            radius="xl"
          />
        </ActionIcon>
      }
      styles={(theme) => {
        return {
          label: { fontSize: theme.fontSizes.sm },
          itemLabel: { fontSize: theme.fontSizes.md },
        };
      }}
    >
      <Menu.Label>User</Menu.Label>
      <Menu.Item
        icon={<Avatar src={USER.ITATCHI.imageURL} radius="xl" />}
        onClick={() => {
          setUser(USER.ITATCHI);
        }}
      >
        {USER.ITATCHI.name}
      </Menu.Item>
      <Menu.Item
        icon={<Avatar src={USER.JACK.imageURL} radius="xl" />}
        onClick={() => {
          setUser(USER.JACK);
        }}
      >
        {USER.JACK.name}
      </Menu.Item>
    </Menu>
  );
};
