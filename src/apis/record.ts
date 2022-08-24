import axios from "axios"
import type { RecordFavoritePutRequest } from "src/types/favorite"
import type { RecordRequest, RecordResponse } from "src/types/record"

export const fetchRecords = async (id?: string) => {
	const userId = id ? "/user/" + id : ""
	const records: RecordResponse[] = (
		await axios.get(process.env.NEXT_PUBLIC_URL + "/api/records" + userId)
	).data
	return records
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
