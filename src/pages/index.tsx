import { Tabs } from "antd"
import type { NextPage } from "next"

import GoalListContainer from "src/components/container/GoalListContainer"
import TimelineContainer from "src/components/container/TimelineContainer"

const { TabPane } = Tabs

const Index: NextPage = () => {
	return (
		<div>
			<Tabs centered className="mt-4" defaultActiveKey="timeline" size="large">
				<TabPane key="timeline" tab="タイムライン">
					<TimelineContainer />
				</TabPane>
				<TabPane key="goals" tab="目標">
					<GoalListContainer />
				</TabPane>
			</Tabs>
		</div>
	)
}

export default Index
