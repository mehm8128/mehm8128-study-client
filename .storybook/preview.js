import "styles/globals.css"
import "styles/libs.css"
import "windi.css"
import { RouterContext } from "next/dist/shared/lib/router-context"
import { RecoilRoot } from "recoil"

export const parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	nextRouter: {
		Provider: RouterContext.Provider,
		path: "/",
		asPath: "/",
		query: {},
		push() {},
	},
}

export const decorators = [
	(Story) => (
		<RecoilRoot>
			<Story />
		</RecoilRoot>
	),
]
