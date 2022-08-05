import { Group, Loader } from "@mantine/core";
import type { FC } from "react";

/** @package */
export const Loading: FC = () => {
  return (
    <Group position="center">
      <Loader color="gray" size="sm" />
    </Group>
  );
};
