import "../styles/globals.css"
import "../styles/libs.css"
import "windi.css"

import type { AppProps } from "next/app"

import Head from "next/head"
import { Suspense } from "react"
import { RecoilRoot } from "recoil"
import Header from "../components/common/Header"
import Wrapper from "src/components/common/Wrapper"

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<RecoilRoot>
			<Head>
				<title>タイトル</title>
			</Head>
			<Suspense fallback={<div>loading...</div>}>
				<Wrapper>
					<Header />
					<Component {...pageProps} />
				</Wrapper>
			</Suspense>
		</RecoilRoot>
	)
}

export default MyApp
