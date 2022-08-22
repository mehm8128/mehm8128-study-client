import axios from "axios"
import { User } from "src/types/user"

export const getUsers = async (id?: string) => {
	const userId = id ? "/" + id : ""
	const users: User[] = (
		await axios.get(process.env.NEXT_PUBLIC_URL + "/api/users" + userId)
	).data
	return users
}

export const getMe = async () => {
	const users: User[] = (
		await axios.get(process.env.NEXT_PUBLIC_URL + "/api/users/me", {
			withCredentials: true,
		})
	).data
	return users
}

// const getMe = () => {
// 	axios
// 		.get(process.env.NEXT_PUBLIC_URL + "/api/users/me", {
// 			withCredentials: true,
// 		})
// 		.then((res) => {
// 			setMe({
// 				id: res.data.id,
// 				name: res.data.name,
// 				auth: true,
// 			})
// 		})
// 		.catch(() => {
// 			if (!me.auth) router.replace("/login")
// 		})
// }

export const postLogout = async () => {
	const res = await axios.post(
		process.env.NEXT_PUBLIC_URL + "/api/users/logout",
		{},
		{
			withCredentials: true,
		}
	)
	return res
}
//  axios
// 		.post(
// 			process.env.NEXT_PUBLIC_URL + "/api/users/logout",
// 			{},
// 			{
// 				withCredentials: true,
// 			}
// 		)
// 		.then(() => {
// 			setMe({ id: "", name: "", auth: false })
// 			router.push("/login")
// 		})
// 		.catch((err) => alert(err))
