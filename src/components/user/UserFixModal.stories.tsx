import type { Meta } from "@storybook/react"
import UserFixModal from "./UserFixModal"

export default {
	title: "user/UserFixModal",
	component: UserFixModal,
} as Meta

export const Default = () => (
	<UserFixModal
		shouldShowFixModal
		setShouldShowFixModal={() => {
			return
		}}
	/>
)
