import axios from "axios"
import { FileResponse } from "src/types/file"

export const postFile = async (data: FormData) => {
	const res: FileResponse = (
		await axios.post(process.env.NEXT_PUBLIC_URL + "/api/files", data)
	).data
	return res
}
