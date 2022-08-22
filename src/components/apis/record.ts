import axios from "axios"
import { Record } from "src/types/record"

export const getRecords = async (id?: string) => {
	const userId = id ? "/user/" + id : ""
	const records: Record[] = (
		await axios.get(process.env.NEXT_PUBLIC_URL + "/api/records" + userId)
	).data
	return records
}
