import "@/styles/globals.css";
import type { AppProps } from "next/app";

//24 -> to fetch data from graphql server we will user apollo client
// npm i @apollo/client graphql

//25
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

//32 -> show error messages from graphql if in terminal
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
loadDevMessages();
loadErrorMessages();

//26
const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  //27 cache the data inside memory
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    /* //28 */
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}