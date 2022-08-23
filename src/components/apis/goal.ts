import axios from "axios"
import type { GoalResponse } from "src/types/goal"

export const fetchGoals = async (id?: string) => {
	const userId = id ? "/user/" + id : ""
	const goals: GoalResponse[] = (
		await axios.get(process.env.NEXT_PUBLIC_URL + "/api/goals" + userId)
	).data
	return goals
}
