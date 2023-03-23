import "@/styles/globals.css";
import type { AppProps } from "next/app";
import RootLayout from "./RootLayout";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { wrapper } from "@/store";
import { Provider } from "react-redux";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, ...rest }: AppPropsWithLayout) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Provider store={store}>
      <RootLayout>
        {
          getLayout(<Component {...pageProps} />)
        }
      </RootLayout>
    </Provider>
  );
}

export default App;