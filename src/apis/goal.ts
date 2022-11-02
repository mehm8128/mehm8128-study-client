import axios from "axios"
import useSWR from "swr"
import { SwrResponse } from "src/types/SWR"
import type { GoalFavoritePutRequest } from "src/types/favorite"
import type { GoalRequest, GoalResponse } from "src/types/goal"
import { fetcher } from "src/utils/fetcher"

export const useFetchGoals = (userId = ""): SwrResponse<GoalResponse[]> => {
	const { data, error, mutate } = useSWR<GoalResponse[], Error>(
		`${process.env.NEXT_PUBLIC_URL}/api/goals${
			userId === "" ? "" : `/user/${userId}`
		}`,
		fetcher,
		{ suspense: true }
	)
	return {
		data: data as GoalResponse[],
		isError: !!error,
		mutate: mutate,
	}
}

export const postGoal = async (data: GoalRequest) => {
	const res: GoalResponse = await axios.post(
		process.env.NEXT_PUBLIC_URL + "/api/goals",
		data
	)
	return res
}

export const putGoal = async (goalId: string, data: GoalRequest) => {
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
