import axios from "axios"
import { Goal } from "src/types/goal"

export const getGoals = async (id?: string) => {
	const userId = id ? "/user/" + id : ""
	const goals: Goal[] = (
		await axios.get(process.env.NEXT_PUBLIC_URL + "/api/goals" + userId)
	).data
	return goals
}
