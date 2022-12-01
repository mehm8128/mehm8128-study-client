import type { Meta } from "@storybook/react"
import Goal from "./Goal"
import { GoalResponse } from "src/types/goal"

const goal: GoalResponse = {
	id: "aaa",
	title: "test",
	comment: "test",
	goalDate: "2022-04-27",
	isCompleted: false,
	favorites: [],
	favoriteNum: 0,
	createdBy: "a1befe35-f5af-4fae-8153-15a35b1052d2",
	createdAt: "2022-11-27T14:28:55.785018Z",
	updatedAt: "2022-11-27T14:28:55.785018Z",
}

export default {
	title: "goal/Goal",
	component: Goal,
} as Meta

export const Default = () => <Goal goal={goal} />