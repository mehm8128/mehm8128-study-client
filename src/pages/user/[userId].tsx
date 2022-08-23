import { useQueries } from "@tanstack/react-query"
import type { NextPage } from "next"
import { useRouter } from "next/router"

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
	const [
		{ isLoading: isUsersLoading, isError: isUsersError },
		{ isLoading: isUserLoading, isError: isUserError, data: user },
	] = useQueries({
		queries: [
			{ queryKey: ["users"], queryFn: fetchUsers },
			{ queryKey: ["user", userId], queryFn: () => fetchUser(userId) },
		],
	})
	if (isUserLoading || isUsersLoading) {
		return <div>Loading...</div>
	}
	if (isUserError || isUsersError) {
		return <div>Error!</div>
	}
	return (
		<div className="h-full">
			{user !== undefined ? <UserIntro user={user} /> : null}
			<div className="flex justify-around">
				<div className="h-1/5 w-2/5">
					<h2 className="mb-4 text-center text-2xl">勉強の記録</h2>
					<Timeline userId={userId.toString()} />
				</div>
				<div className="h-1/5 w-2/5">
					<h2 className="mb-4 text-center text-2xl">目標</h2>
					<GoalList userId={userId.toString()} />
				</div>
			</div>
		</div>
	)
}

export default User
