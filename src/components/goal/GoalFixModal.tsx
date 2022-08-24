import { Modal } from "antd"
import type { GoalResponse } from "../../types/goal"
import GoalSettingForm from "./GoalSettingForm"

type Props = {
	goal: GoalResponse
	shoudShowFixModal: boolean
	setShouldShowFixModal: (value: boolean) => void
}
const GoalFixModal: React.FC<Props> = (props) => {
	const defaultValues = {
		title: props.goal.title,
		goalDate: props.goal.goalDate,
		comment: props.goal.comment,
	}

	return (
		<Modal
			centered
			footer={null}
			title="目標の編集"
			visible={props.shoudShowFixModal}
			onCancel={() => props.setShouldShowFixModal(false)}
		>
			<GoalSettingForm
				defaultValues={defaultValues}
				id={props.goal.id}
				isCompleted={props.goal.isCompleted}
				setShouldShowFixModal={props.setShouldShowFixModal}
			/>
		</Modal>
	)
}

export default GoalFixModal
