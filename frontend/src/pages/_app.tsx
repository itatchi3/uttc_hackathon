import { NotificationsProvider } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { CustomAppPage } from "next/app";
import { AppMantineProvider, GlobalStyleProvider } from "src/lib/mantine";

const App: CustomAppPage = ({ Component, pageProps }) => {
  const getLayout =
    Component.getLayout ||
    ((page) => {
      return page;
    });

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyleProvider>
        <AppMantineProvider>
          <NotificationsProvider>
            {getLayout(<Component {...pageProps} />)}
          </NotificationsProvider>
        </AppMantineProvider>
      </GlobalStyleProvider>
    </QueryClientProvider>
  );
};

export default App;
