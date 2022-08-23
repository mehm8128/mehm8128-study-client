import axios from "axios"
import { LoginData } from "../components/login/Login"
import { SignupData } from "../components/login/SignUp"
import type { Me, UserResponse } from "src/types/user"

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

export const postSignup = async (data: SignupData) => {
	const res = await axios.post(
		process.env.NEXT_PUBLIC_URL + "/api/users/signup",
		data
	)
	return res
}

export const postLogin = async (data: LoginData) => {
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
