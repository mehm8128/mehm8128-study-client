import type { NextPage } from "next"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "src/components/UserProvider"
import GoalListContainer from "src/components/container/GoalListContainer"
import TimelineContainer from "src/components/container/TimelineContainer"

type Tab = "timeline" | "goals"

const Index: NextPage = () => {
	const { getUsers } = useContext(UserContext)
	const [currentTab, setCurrentTab] = useState<Tab>("timeline")

	useEffect(() => {
		getUsers()
	}, [])

	return (
		<>
			<div className="tabs mt-8 justify-center">
				<button
					className={`tab w-2/5 text-lg ${
						currentTab === "timeline" && "border-b border-blue-300"
					}`}
					onClick={() => setCurrentTab("timeline")}
				>
					タイムライン
				</button>
				<button
					className={`tab w-2/5 text-lg ${
						currentTab === "goals" && "border-b border-blue-300"
					}`}
					onClick={() => setCurrentTab("goals")}
				>
					みんなの目標
				</button>
			</div>
			<div>
				{currentTab === "timeline" && <TimelineContainer />}
				{currentTab === "goals" && <GoalListContainer />}
			</div>
		</>
	)
}

export default Index
