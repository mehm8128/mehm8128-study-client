import axios from "axios"
import useSWR from "swr"
import { SwrResponse } from "src/types/SWR"
import type {
	MemorizeResponse,
	QuizResponse,
	WordRequest,
} from "src/types/memorize"
import { fetcher } from "src/utils/fetcher"

export const useFetchQuiz = (
	memorizeId: string
): SwrResponse<QuizResponse[]> => {
	const { data, error } = useSWR<QuizResponse[], Error>(
		`${process.env.NEXT_PUBLIC_URL}/api/memorizes/${memorizeId}/quiz`,
		fetcher
	)
	return {
		data: data,
		isError: !!error,
	}
}

export const useFetchMemorizes = (): SwrResponse<MemorizeResponse[]> => {
	const { data, error } = useSWR<MemorizeResponse[], Error>(
		`${process.env.NEXT_PUBLIC_URL}/api/memorizes`,
		fetcher
	)
	return {
		data: data,
		isError: !!error,
	}
}

export const postWords = async (targetMemorize: string, data: WordRequest) => {
	const res = await axios.post(
		process.env.NEXT_PUBLIC_URL + `/api/memorizes/${targetMemorize}/words`,
		data
	)
	return res
}
