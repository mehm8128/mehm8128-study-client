import type { NextPage } from "next"
import { useRouter } from "next/router"
import { useQuery } from "react-query"
import { useRecoilValue } from "recoil"
import { fetchUser, fetchUsers } from "src/apis/user"
import UserIntro from "src/components/UserIntro"
import GoalList from "src/components/goal/GoalList"
import Timeline from "src/components/record/Timeline"
import { meState } from "src/recoil/atoms/user"
import { paramToString } from "src/utils/paramsToString"

const User: NextPage = () => {
	const me = useRecoilValue(meState)
	const router = useRouter()
	const userId =
		router.query.userId !== "me" ? paramToString(router.query.userId) : me.id
	const { isLoading: isUsersLoading, error: usersError } = useQuery(
		["users"],
		() => fetchUsers
	)
	const {
		isLoading: isUserLoading,
		error: userError,
		data: user,
	} = useQuery(["user", userId], () => fetchUser(userId))

	if (isUsersLoading || isUserLoading) {
		return <div>Loading...</div>
	}
	if (usersError || userError) {
		return <div>Error!</div>
	}
	return (
		<div className="h-full">
			{user !== undefined ? <UserIntro user={user} /> : null}
			<div className="flex justify-around">
				<div className="h-1/5 w-2/5">
					<h2 className="mb-4 text-center text-2xl">勉強の記録</h2>
					<Timeline userid={userId.toString()} />
				</div>
				<div className="h-1/5 w-2/5">
					<h2 className="mb-4 text-center text-2xl">目標</h2>
					<GoalList userid={userId.toString()} />
				</div>
			</div>
		</div>
	)
}

export default User
