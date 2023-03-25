import "@/styles/globals.css";
import type { AppProps } from "next/app";
import RootLayout from "./RootLayout";
import { NextPage } from "next";
import { ReactElement, ReactNode, useEffect } from "react";
import { wrapper } from "@/store";
import { Provider } from "react-redux";
import { useRouter } from "next/router";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, ...rest }: AppPropsWithLayout) => {
  const router = useRouter();
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  // TODO: Probably have a better way.
  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    const account = localStorage.getItem("account");
    if (!jwtToken || !account) {
      router.push("/login");
    } else {
      router.push("/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Provider store={store}>
      <RootLayout>
        {
          getLayout(<Component {...pageProps} />)
        }
      </RootLayout>
    </Provider>
  );
};

export default App;