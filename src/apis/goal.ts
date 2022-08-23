import axios from "axios"
import type { GoalFavoritePutRequest } from "src/types/favorite"
import type {
	GoalPostRequest,
	GoalPutRequest,
	GoalResponse,
} from "src/types/goal"

export const fetchGoals = async (id?: string) => {
	const goalId = id ? "/user/" + id : ""
	const goals: GoalResponse[] = (
		await axios.get(process.env.NEXT_PUBLIC_URL + "/api/goals" + goalId)
	).data
	return goals
}

export const postGoal = async (data: GoalPostRequest) => {
	const res: GoalResponse = await axios.post(
		process.env.NEXT_PUBLIC_URL + "/api/goals",
		data
	)
	return res
}

export const putGoal = async (goalId: string, data: GoalPutRequest) => {
	const res: GoalResponse = await axios.put(
		process.env.NEXT_PUBLIC_URL + "/api/goals/" + goalId,
		data
	)
	return res
}

export const putGoalFavorite = async (
	goalId: string,
	data: GoalFavoritePutRequest
) => {
	const res = await axios.put(
		process.env.NEXT_PUBLIC_URL + "/api/goals/favorite/" + goalId,
		data
	)
	return res
}

export const deleteGoal = async (goalId: string) => {
	const res = await axios.delete(
		process.env.NEXT_PUBLIC_URL + "/api/goals/" + goalId
	)
	return res
}
