import { Modal } from "antd"
import UserFixForm from "./UserFixForm"
import { UserResponse } from "src/types/user"

type Props = {
	user: UserResponse
	shouldShowFixModal: boolean
	setShouldShowFixModal: (value: boolean) => void
}
const UserFixModal: React.FC<Props> = (props) => {
	const defaultValues = {
		username: props.user.name,
		description: props.user.description,
	}
	return (
		<Modal
			centered
			footer={null}
			title="ユーザー情報の編集"
			visible={props.shouldShowFixModal}
			onCancel={() => props.setShouldShowFixModal(false)}
		>
			<UserFixForm
				defaultValues={defaultValues}
				setShouldShowFixModal={props.setShouldShowFixModal}
			/>
		</Modal>
	)
}

export default UserFixModal
