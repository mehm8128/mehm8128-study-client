import { Modal } from "antd"
import UserFixForm from "./UserFixForm"

interface Props {
	shouldShowFixModal: boolean
	setShouldShowFixModal: (value: boolean) => void
}

const UserFixModal: React.FC<Props> = (props) => {
	return (
		<Modal
			centered
			footer={null}
			open={props.shouldShowFixModal}
			title="ユーザー情報の編集"
			onCancel={() => props.setShouldShowFixModal(false)}
		>
			<UserFixForm setShouldShowFixModal={props.setShouldShowFixModal} />
		</Modal>
	)
}

export default UserFixModal
