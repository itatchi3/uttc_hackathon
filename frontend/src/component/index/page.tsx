import { useRouter } from "next/router";
import { useEffect } from "react";
import { Loading } from "src/component";

/** @package */
export const Index = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/channel/1");
  }, [router]);

  return <Loading />;
};
