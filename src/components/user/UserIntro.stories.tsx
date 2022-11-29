import type { Meta } from "@storybook/react"
import UserIntro from "./UserIntro"

export default {
	title: "user/UserIntro",
	component: UserIntro,
} as Meta

export const Default = () => (
	<UserIntro userId="a1befe35-f5af-4fae-8153-15a35b1052d2" />
)
