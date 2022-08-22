import axios from "axios"
import { Memorize, Quiz, WordRequest } from "src/types/memorize"

export const getQuiz = async (id: string) => {
	const quiz: Quiz[] = (
		await axios.get(
			process.env.NEXT_PUBLIC_URL + "/api/memorizes/" + id + "/quiz"
		)
	).data
	return quiz
}

export const getMemorizes = async () => {
	const memorizes: Memorize[] = (
		await axios.get(process.env.NEXT_PUBLIC_URL + "/api/memorizes")
	).data
	return memorizes
}

export const postWords = async (targetMemorize: string, data: WordRequest) => {
	const res = await axios.post(
		process.env.NEXT_PUBLIC_URL + `/api/memorizes/${targetMemorize}/words`,
		data
	)
	return res
}
