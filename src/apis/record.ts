import axios from "axios"
import useSWR from "swr"
import { SwrResponse } from "src/types/SWR"
import type { RecordFavoritePutRequest } from "src/types/favorite"
import type { RecordRequest, RecordResponse } from "src/types/record"
import { fetcher } from "src/utils/fetcher"

export const useFetchRecords = (userId = ""): SwrResponse<RecordResponse[]> => {
	const { data, error } = useSWR<RecordResponse[], Error>(
		`${process.env.NEXT_PUBLIC_URL}/api/records/user/${userId}`,
		fetcher
	)
	return {
		data: data,
		isError: !!error,
	}
}

export const postRecord = async (data: RecordRequest) => {
	const res: RecordResponse = await axios.post(
		process.env.NEXT_PUBLIC_URL + "/api/records",
		data
	)
	return res
}

export const putRecord = async (recordId: string, data: RecordRequest) => {
	const res: RecordResponse = await axios.put(
		process.env.NEXT_PUBLIC_URL + "/api/records/" + recordId,
		data
	)
	return res
}

export const putRecordFavorite = async (
	recordId: string,
	data: RecordFavoritePutRequest
) => {
	const res = axios.put(
		process.env.NEXT_PUBLIC_URL + "/api/records/favorite/" + recordId,
		data
	)
	return res
}

export const deleteRecord = async (recordId: string) => {
	const res = await axios.delete(
		process.env.NEXT_PUBLIC_URL + "/api/records/" + recordId
	)
	return res
}
