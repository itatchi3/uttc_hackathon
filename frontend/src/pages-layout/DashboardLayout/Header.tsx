import { ActionIcon, Avatar, Box, Group, Menu, Title } from "@mantine/core";
import type { FC, ReactNode } from "react";
import { useRecoilValue } from "recoil";
import { useRecoilState } from "recoil";
import { channelNameState } from "src/lib/channel";
import { loginUserState } from "src/lib/user";

import { useGetUsersQuery } from "../../lib/user";

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

const UserMenu: FC = () => {
  const [loginUser, setLoginUser] = useRecoilState(loginUserState);
  const users = useGetUsersQuery();

  return (
    <Menu
      size="lg"
      position="bottom"
      placement="end"
      transition="pop-top-right"
      control={
        <ActionIcon variant="hover" radius="xl" size={40}>
          <Avatar src={loginUser.profile_url} radius="xl" />
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
      {users.data &&
        users.data.map((user) => {
          return (
            <Menu.Item
              key={user.id}
              icon={<Avatar src={user.profile_url} radius="xl" />}
              onClick={() => {
                setLoginUser(user);
              }}
            >
              {user.name}
            </Menu.Item>
          );
        })}
    </Menu>
  );
};
