import type { FC } from "react";

type Props = {
  channelId: string;
};

/** @package */
export const Channel: FC<Props> = ({ channelId }) => {
  return <p>{channelId}</p>;
};
