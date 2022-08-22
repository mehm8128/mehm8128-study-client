import { Modal } from "antd"
import type { Goal } from "../../types/goal"
import GoalFixForm from "./GoalFixForm"

type Props = {
	goal: Goal
	shoudShowFixModal: boolean
	setShouldShowFixModal: (value: boolean) => void
}
const GoalFixModal: React.FC<Props> = (props) => {
	return (
		<Modal
			centered
			footer={null}
			title="目標の編集"
			visible={props.shoudShowFixModal}
			onCancel={() => props.setShouldShowFixModal(false)}
		>
			<GoalFixForm
				defaultComment={props.goal.comment}
				defaultGoalDate={props.goal.goalDate}
				defaultTitle={props.goal.title}
				id={props.goal.id}
				isCompleted={props.goal.isCompleted}
				setShouldShowFixModal={props.setShouldShowFixModal}
			/>
		</Modal>
	)
}

export default GoalFixModal
