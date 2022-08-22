import type { NextPage } from "next"
import { useContext, useEffect } from "react"
import { UserContext } from "src/components/UserProvider"
import GoalListContainer from "src/components/container/GoalListContainer"
import TimeLineContainer from "src/components/container/TimeLineContainer"

const Index: NextPage = () => {
	const { getUsers } = useContext(UserContext)
	useEffect(() => {
		getUsers()
	}, [])
	return (
		<>
			<div className="tabs mt-8 justify-center">
				<div className="tab w-2/5 text-lg">タイムライン</div>
				<div className="tab w-2/5 text-lg">みんなの目標</div>
			</div>
			<div>
				<TimeLineContainer />
				<GoalListContainer />
			</div>
		</>
	)
}

export default Index
