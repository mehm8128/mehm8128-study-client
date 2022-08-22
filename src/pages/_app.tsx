import "../styles/globals.css"
import "windi.css"

import { ChakraProvider } from "@chakra-ui/react"

import type { AppProps } from "next/app"
import Header from "../components/common/Header"

import { UserProvider } from "src/components/UserProvider"

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider>
			<UserProvider>
				<Header />
				<Component {...pageProps} />
			</UserProvider>
		</ChakraProvider>
	)
}

export default MyApp
