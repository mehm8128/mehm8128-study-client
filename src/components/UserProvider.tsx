import axios from "axios"
import { useRouter } from "next/router"
import { createContext, useEffect, useState } from "react"
import { GoalType } from "src/types/goal"
import { RecordType } from "src/types/record"
import { Me, User } from "src/types/user"

type UserContextType = {
	me: Me
	login: (me: Me) => void
	logout: () => void
	getRecords: (id?: string) => void
	getGoals: (id?: string) => void
	getUsers: () => void
	getMe: () => void
	records: RecordType[]
	goals: GoalType[]
	users: User[]
}
export const UserContext = createContext<UserContextType>({} as UserContextType)

export const UserProvider: React.FC = ({ children }) => {
	const [me, setMe] = useState<Me>({
		id: "",
		name: "",
		auth: false,
	})
	const [records, setRecords] = useState<RecordType[]>(new Array<RecordType>())
	const [goals, setGoals] = useState<GoalType[]>(new Array<GoalType>())
	const [users, setUsers] = useState<User[]>(new Array<User>())

	const router = useRouter()

	const login = (me: Me) => {
		setMe(me)
	}
	const logout = () => {
		axios
			.post(
				process.env.NEXT_PUBLIC_URL + "/api/users/logout",
				{},
				{
					withCredentials: true,
				}
			)
			.then(() => {
				setMe({ id: "", name: "", auth: false })
				router.push("/login")
			})
			.catch((err) => alert(err))
	}
	const getRecords = async (id?: string) => {
		const userId = id ? "/user/" + id : ""
		await axios
			.get(process.env.NEXT_PUBLIC_URL + "/api/records" + userId)
			.then((res) => {
				setRecords(res.data)
			})
	}
	const getGoals = async (id?: string) => {
		const userId = id ? "/user/" + id : ""
		await axios
			.get(process.env.NEXT_PUBLIC_URL + "/api/goals" + userId)
			.then((res) => {
				setGoals(res.data)
			})
	}
	const getUsers = () => {
		axios.get(process.env.NEXT_PUBLIC_URL + "/api/users").then((res) => {
			setUsers(res.data)
		})
	}
	const getMe = () => {
		axios
			.get(process.env.NEXT_PUBLIC_URL + "/api/users/me", {
				withCredentials: true,
			})
			.then((res) => {
				setMe({
					id: res.data.id,
					name: res.data.name,
					auth: true,
				})
			})
			.catch(() => {
				if (!me.auth) router.replace("/login")
			})
	}

	useEffect(() => {
		getMe()
	}, [router.pathname])
	return (
		<UserContext.Provider
			value={{
				me,
				login,
				logout,
				getRecords,
				getGoals,
				getUsers,
				getMe,
				records,
				goals,
				users,
			}}
		>
			{children}
		</UserContext.Provider>
	)
}
