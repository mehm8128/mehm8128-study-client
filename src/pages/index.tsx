import { Tabs } from "antd"
import type { NextPage } from "next"

import GoalListContainer from "src/components/container/GoalListContainer"
import TimelineContainer from "src/components/container/TimelineContainer"

const { TabPane } = Tabs

const Index: NextPage = () => {
	return (
		<div>
			<Tabs
				centered
				className="mt-8 flex justify-center"
				defaultActiveKey="timeline"
				size="large"
				tabBarGutter={100}
			>
				<TabPane className="h-12 text-lg" key="timeline" tab="タイムライン">
					<TimelineContainer />
				</TabPane>
				<TabPane className="h-12 text-lg" key="goals" tab="目標">
					<GoalListContainer />
				</TabPane>
			</Tabs>
		</div>
	)
}

export default Index
