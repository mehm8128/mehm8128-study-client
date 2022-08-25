import { Modal } from "antd"
import UserFixForm from "./UserFixForm"

type Props = {
	shouldShowFixModal: boolean
	setShouldShowFixModal: (value: boolean) => void
}

const UserFixModal: React.FC<Props> = (props) => {
	return (
		<Modal
			centered
			footer={null}
			title="ユーザー情報の編集"
			visible={props.shouldShowFixModal}
			onCancel={() => props.setShouldShowFixModal(false)}
		>
			<UserFixForm setShouldShowFixModal={props.setShouldShowFixModal} />
		</Modal>
	)
}

export default UserFixModal
