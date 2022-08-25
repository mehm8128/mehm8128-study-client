import axios from "axios"
import type {
	LoginRequest,
	Me,
	SignupRequest,
	UserPutRequest,
	UserResponse,
} from "src/types/user"

export const fetchUsers = async () => {
	const users: UserResponse[] = (
		await axios.get(process.env.NEXT_PUBLIC_URL + "/api/users")
	).data
	return users
}

export const fetchUser = async (userId: string) => {
	const user: UserResponse = (
		await axios.get(process.env.NEXT_PUBLIC_URL + "/api/users/" + userId)
	).data
	return user
}

export const fetchMe = async () => {
	const me: Me = (
		await axios.get(process.env.NEXT_PUBLIC_URL + "/api/users/me", {
			withCredentials: true,
		})
	).data
	return me
}

export const postSignup = async (data: SignupRequest) => {
	const res = await axios.post(
		process.env.NEXT_PUBLIC_URL + "/api/users/signup",
		data
	)
	return res
}

export const postLogin = async (data: LoginRequest) => {
	const res = await axios.post(
		process.env.NEXT_PUBLIC_URL + "/api/users/login",
		data,
		{ withCredentials: true }
	)
	return res
}

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

export const putUser = async (data: UserPutRequest) => {
	const res = await axios.put(
		process.env.NEXT_PUBLIC_URL + "/api/users/me",
		data,
		{ withCredentials: true }
	)
	return res
}
