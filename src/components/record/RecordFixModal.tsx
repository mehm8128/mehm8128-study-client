import { Modal } from "antd"

import { RecordType } from "../../types/record"
import RecordFixForm from "./RecordFixForm"

type Props = {
	record: RecordType
	shoudShowFixModal: boolean
	setShouldShowFixModal: (value: boolean) => void
}
const RecordFixModal: React.FC<Props> = (props) => {
	return (
		<Modal
			centered
			footer={null}
			title="記録の編集"
			visible={props.shoudShowFixModal}
			onCancel={() => props.setShouldShowFixModal(false)}
		>
			<RecordFixForm
				defaultComment={props.record.comment}
				defaultPage={props.record.page.toString()}
				defaultTime={props.record.time.toString()}
				defaultTitle={props.record.title}
				id={props.record.id}
				setShouldShowFixModal={props.setShouldShowFixModal}
			/>
		</Modal>
	)
}

export default RecordFixModal
