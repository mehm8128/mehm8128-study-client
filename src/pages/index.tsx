import { Tabs } from "antd"
import type { NextPage } from "next"

import GoalListContainer from "src/components/container/GoalListContainer"
import TimelineContainer from "src/components/container/TimelineContainer"

const { TabPane } = Tabs

const Index: NextPage = () => {
	const tabItems = [
		{
			label: "タイムライン",
			key: "timeline",
			children: <TimelineContainer />,
		},
		{
			label: "目標",
			key: "goals",
			children: <GoalListContainer />,
		},
	]
	return (
		<div>
			<Tabs
				centered
				className="mt-4"
				defaultActiveKey="timeline"
				items={tabItems}
				size="large"
			/>
		</div>
	)
}

export default Index
