import axios from "axios"
import useSWR from "swr"
import type { SWRConfiguration } from "swr"
import { SwrResponse } from "src/types/SWR"
import type {
	MemorizeResponse,
	QuizResponse,
	WordRequest,
} from "src/types/memorize"
import { fetcher } from "src/utils/fetcher"

export const useFetchQuiz = (
	memorizeId: string,
	options: SWRConfiguration = {}
): SwrResponse<QuizResponse[]> => {
	const { data, error, mutate } = useSWR<QuizResponse[], Error>(
		`${process.env.NEXT_PUBLIC_URL}/api/memorizes/${memorizeId}/quiz`,
		fetcher,
		options
	)
	return {
		data: data,
		isError: !!error,
		mutate: mutate,
	}
}

export const useFetchMemorizes = (
	options: SWRConfiguration = {}
): SwrResponse<MemorizeResponse[]> => {
	const { data, error, mutate } = useSWR<MemorizeResponse[], Error>(
		`${process.env.NEXT_PUBLIC_URL}/api/memorizes`,
		fetcher,
		options
	)
	return {
		data: data,
		isError: !!error,
		mutate: mutate,
	}
}

export const postWords = async (targetMemorize: string, data: WordRequest) => {
	const res = await axios.post(
		process.env.NEXT_PUBLIC_URL + `/api/memorizes/${targetMemorize}/words`,
		data
	)
	return res
}
