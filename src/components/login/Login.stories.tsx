import type { Meta } from "@storybook/react"
import Login from "./Login"

export default {
	title: "Login",
	component: Login,
} as Meta
//argsとargTypesの違い、MetaとComponentMeta<typeof Button>みたいなやつの違い

export const Default = () => <Login />
