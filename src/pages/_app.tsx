import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider } from "react-query";
import { theme } from "../styles/theme";
import { ReactQueryDevtools } from "react-query/devtools";
import { queryClient } from "../utils/queryClient";
import { SearchProvider } from "../hooks/useSearch";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
