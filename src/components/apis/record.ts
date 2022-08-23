import axios from "axios"
import type { RecordResponse } from "src/types/record"

export const fetchRecords = async (id?: string) => {
	const userId = id ? "/user/" + id : ""
	const records: RecordResponse[] = (
		await axios.get(process.env.NEXT_PUBLIC_URL + "/api/records" + userId)
	).data
	return records
}
