import "../styles/globals.css"
import "../styles/libs.css"
import "windi.css"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { AppProps } from "next/app"

import Head from "next/head"
import { RecoilRoot } from "recoil"
import Header from "../components/common/Header"
import Wrapper from "src/components/common/Wrapper"

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<RecoilRoot>
			<QueryClientProvider client={queryClient}>
				<Wrapper>
					<Head>
						<title>タイトル</title>
					</Head>
					<Header />
					<Component {...pageProps} />
				</Wrapper>
			</QueryClientProvider>
		</RecoilRoot>
	)
}

export default MyApp
