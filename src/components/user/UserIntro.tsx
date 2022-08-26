import { Avatar, Button } from "antd"
import { useState } from "react"
import { useRecoilValue } from "recoil"
import UserFixModal from "./UserFixModal"
import { useFetchRecords } from "src/apis/record"
import { useFetchUser } from "src/apis/user"
import { meState } from "src/recoil/atoms/user"
import { minutesToHoursAndMinutes } from "src/utils/minutesToHoursAndMinutes"

type Props = {
	userId: string
}
const UserIntro: React.FC<Props> = (props) => {
	const { data: records, isError: isRecordsError } = useFetchRecords(
		props.userId ?? ""
	)
	const { data: user, isError: isUserError } = useFetchUser(props.userId ?? "")
	const me = useRecoilValue(meState)
	const [shouldShowFixModal, setShouldShowFixModal] = useState(false)

	if (!user || !records) {
		return <div>Loading...</div>
	}
	if (isRecordsError || isUserError) {
		return <div>Error!</div>
	}

	const fullStudyTime = records.reduce((acc, record) => {
		return acc + record.time
	}, 0)

	return (
		<>
			<div className="p-4">
				<div className="flex items-center">
					<Avatar className="mr-2">{user.name.substring(0, 1)}</Avatar>
					<p className="text-2xl">{user.name}</p>
					{me.id === props.userId ? (
						<Button
							className="ml-4"
							onClick={() => setShouldShowFixModal(true)}
						>
							ユーザー情報を編集する
						</Button>
					) : null}
				</div>
				<div className="h-20 p-4 text-lg">
					<p>総勉強時間：{minutesToHoursAndMinutes(fullStudyTime)}</p>
					<p className="whitespace-pre-wrap">{user.description}</p>
				</div>
			</div>
			<UserFixModal
				setShouldShowFixModal={setShouldShowFixModal}
				shouldShowFixModal={shouldShowFixModal}
			/>
		</>
	)
}

export default UserIntro
