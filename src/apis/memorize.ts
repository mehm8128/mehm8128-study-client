import axios from "axios"
import type {
	MemorizeResponse,
	QuizResponse,
	WordRequest,
} from "src/types/memorize"

export const fetchQuiz = async (id: string) => {
	const quiz: QuizResponse[] = (
		await axios.get(
			process.env.NEXT_PUBLIC_URL + "/api/memorizes/" + id + "/quiz"
		)
	).data
	return quiz
}

export const fetchMemorizes = async () => {
	const memorizes: MemorizeResponse[] = (
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
