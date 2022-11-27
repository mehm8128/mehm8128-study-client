import "windi.css"
import "antd/dist/antd.css"
import "styles/globals.css"
import { RouterContext } from "next/dist/shared/lib/router-context"
import { RecoilRoot } from "recoil"
import { withNextRouter } from "storybook-addon-next-router"

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
	// withNextRouter({
	// 	path: "/",
	// 	asPath: "/",
	// 	query: {},
	// 	push() {},
	// }),
]
