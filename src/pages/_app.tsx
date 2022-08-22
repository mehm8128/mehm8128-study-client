import "../styles/globals.css"
import "windi.css"

import type { AppProps } from "next/app"
import { useRouter } from "next/router"
import { useEffect } from "react"
import Header from "../components/common/Header"
import { getMe } from "src/components/apis/user"

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter()

	useEffect(() => {
		getMe()
	}, [router.pathname])

	return (
		<>
			<Header />
			<Component {...pageProps} />
		</>
	)
}

export default MyApp
