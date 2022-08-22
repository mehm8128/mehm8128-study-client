import "../styles/globals.css"
import "windi.css"

import type { AppProps } from "next/app"
import Header from "../components/common/Header"

import { UserProvider } from "src/components/UserProvider"

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<UserProvider>
			<Header />
			<Component {...pageProps} />
		</UserProvider>
	)
}

export default MyApp
