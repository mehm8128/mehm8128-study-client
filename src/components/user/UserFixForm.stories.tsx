import type { Meta } from "@storybook/react"
import UserFixForm from "./UserFixForm"

export default {
	title: "user/UserFixForm",
	component: UserFixForm,
} as Meta

export const Default = () => (
	<UserFixForm
		setShouldShowFixModal={() => {
			return
		}}
	/>
)
