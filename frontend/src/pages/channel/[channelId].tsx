import type { CustomNextPage } from "next";
import { useRouter } from "next/router";
import { Channel, Loading } from "src/pages-component/channel";
import { DashboardLayout } from "src/pages-layout";

const ChannelPage: CustomNextPage = (props) => {
  const router = useRouter();
  const { channelId } = router.query;

  if (typeof channelId === "object") {
    throw new Error("Invalid channelId");
  }

  if (typeof channelId === "undefined") {
    return <Loading />;
  }

  return <Channel {...props} channelId={channelId} />;
};

ChannelPage.getLayout = DashboardLayout;

export default ChannelPage;
