import type { CustomNextPage } from "next";
import { useRouter } from "next/router";
import { Channel } from "src/pages-component/channel";
import { DashboardLayout } from "src/pages-layout";

const ChannelPage: CustomNextPage = (props) => {
  const router = useRouter();
  const { channelId } = router.query;

  //   console.log(typeof channelId);

  if (typeof channelId === "object") {
    throw new Error("Invalid channelId");
  }

  if (typeof channelId === "undefined") {
    return <p>channelId is undefined</p>;
  }

  return <Channel {...props} channelId={channelId} />;
};

ChannelPage.getLayout = DashboardLayout;

export default ChannelPage;
