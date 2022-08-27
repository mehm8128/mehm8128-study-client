import "../styles/globals.css"
import "../styles/libs.css"
import "windi.css"

import type { AppProps } from "next/app"

import Head from "next/head"
import { RecoilRoot } from "recoil"
import Header from "../components/common/Header"
import Wrapper from "src/components/common/Wrapper"

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<RecoilRoot>
			<Wrapper>
				<Head>
					<title>タイトル</title>
				</Head>
				<Header />
				<Component {...pageProps} />
			</Wrapper>
		</RecoilRoot>
	)
}

export default MyApp
