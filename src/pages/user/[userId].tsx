import axios from "axios"
import type { NextPage } from "next"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import UserIntro from "src/components/UserIntro"
import { UserContext } from "src/components/UserProvider"
import GoalList from "src/components/goal/GoalList"
import Timeline from "src/components/record/Timeline"
import { User } from "src/types/user"

const User: NextPage = () => {
	const { me, getUsers } = useContext(UserContext)
	const router = useRouter()
	const id = router.query.userId !== "me" ? router.query.userId : me.id
	const [user, setUser] = useState<User>()

	useEffect(() => {
		if (!router.isReady) {
			return
		}
		getUsers()
		axios
			.get(process.env.NEXT_PUBLIC_URL + "/api/users/" + id)
			.then((res) => setUser(res.data))
			.catch((err) => alert(err))
	}, [router.query])

	return (
		<div className="h-full">
			{user !== undefined ? <UserIntro user={user} /> : null}
			<div className="flex justify-around">
				<div className="h-1/5 w-2/5">
					<h2 className="mb-4 text-center text-2xl">勉強の記録</h2>
					<Timeline userid={id && id.toString()} />
				</div>
				<div className="h-1/5 w-2/5">
					<h2 className="mb-4 text-center text-2xl">目標</h2>
					<GoalList userid={id && id.toString()} />
				</div>
			</div>
		</div>
	)
}

export default User
