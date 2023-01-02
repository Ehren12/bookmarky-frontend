import React, { ReactElement, ReactNode, useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { Layout } from "../components/layouts/layout";
import { NextPage } from "next";
import Script from "next/script";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient());
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <>
      {/* <Script
        type="text/javascript"
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      /> */}

      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          {getLayout(<Component {...pageProps} />)}
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
