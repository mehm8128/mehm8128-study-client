import axios from "axios"
import useSWR from "swr"
import { SwrResponse } from "src/types/SWR"
import type {
	LoginRequest,
	SignupRequest,
	UserPutRequest,
	UserResponse,
} from "src/types/user"
import { fetcher } from "src/utils/fetcher"

export const useFetchUsers = (): SwrResponse<UserResponse[]> => {
	const { data, error } = useSWR<UserResponse[], Error>(
		`${process.env.NEXT_PUBLIC_URL}/api/users`,
		fetcher
	)
	return {
		data: data,
		isError: !!error,
	}
}

export const useFetchUser = (userId: string): SwrResponse<UserResponse> => {
	const { data, error } = useSWR<UserResponse, Error>(
		`${process.env.NEXT_PUBLIC_URL}/api/users/${userId}`,
		fetcher
	)
	return {
		data: data,
		isError: !!error,
	}
}

export const useFetchMe = (): SwrResponse<UserResponse> => {
	const { data, error } = useSWR<UserResponse, Error>(
		`${process.env.NEXT_PUBLIC_URL}/api/users/me`,
		fetcher
	)
	return {
		data: data,
		isError: !!error,
	}
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
