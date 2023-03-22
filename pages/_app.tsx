import "@/styles/globals.css";
import type { AppProps } from "next/app";
import RootLayout from "./RootLayout";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { wrapper } from "@/store";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <RootLayout>
      {
        getLayout(<Component {...pageProps} />)
      }
    </RootLayout>
  );
}

export default wrapper.withRedux(App);