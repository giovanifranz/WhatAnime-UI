//types
import type { AppProps } from "next/app";
//providers
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider } from "react-query";
import { SearchProvider } from "../hooks/useSearch";
//theme
import { theme } from "../styles/theme";
//utils
import { queryClient } from "../utils/queryClient";
//components
import Header from "../components/Header";
import Footer from "../components/Footer";
//devtools
import { ReactQueryDevtools } from "react-query/devtools";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <SearchProvider>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </SearchProvider>
      </ChakraProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
