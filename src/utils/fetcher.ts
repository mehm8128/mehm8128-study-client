import axios from "axios"

export const fetcher = async (path: string) => {
	return await axios
		.get(path, {
			withCredentials: true,
		})
		.then((res) => res.data)
}
