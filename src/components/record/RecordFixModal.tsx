import { Modal } from "antd"

import type { RecordResponse } from "../../types/record"
import RecordForm from "./RecordForm"

interface Props {
	record: RecordResponse
	shoudShowFixModal: boolean
	setShouldShowFixModal: (value: boolean) => void
}
const RecordFixModal: React.FC<Props> = (props) => {
	const defaultValues = {
		title: props.record.title,
		page: props.record.page,
		time: props.record.time,
		comment: props.record.comment,
	}
	return (
		<Modal
			centered
			footer={null}
			open={props.shoudShowFixModal}
			title="記録の編集"
			onCancel={() => props.setShouldShowFixModal(false)}
		>
			<RecordForm
				defaultValues={defaultValues}
				id={props.record.id}
				setShouldShowFixModal={props.setShouldShowFixModal}
			/>
		</Modal>
	)
}

export default RecordFixModal
