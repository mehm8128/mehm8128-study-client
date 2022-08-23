import { Avatar } from "antd"
import { useRecoilValue } from "recoil"
import { recordsState } from "src/recoil/atoms/record"
import { usersState } from "src/recoil/atoms/user"
import type { UserResponse } from "src/types/user"
import { createdByToString } from "src/utils/createdByToString"
import { minutesToHoursAndMinutes } from "src/utils/minutesToHoursAndMinutes"

type Props = {
	user: UserResponse
}
const UserIntro: React.FC<Props> = (props) => {
	const users = useRecoilValue(usersState)
	const records = useRecoilValue(recordsState)
	const fullStudyTime = records.reduce((acc, record) => {
		return acc + record.time
	}, 0)

	return (
		<div className="p-4">
			<div className="flex items-center">
				<Avatar className="mr-2">{props.user.name.substring(0, 1)}</Avatar>
				<p className="text-2xl">{createdByToString(props.user.id, users)}</p>
			</div>
			<div className="h-20 p-4">
				<p>総勉強時間：{minutesToHoursAndMinutes(fullStudyTime)}</p>
				<p className="whitespace-pre-wrap">{props.user.description}</p>
			</div>
		</div>
	)
}

export default UserIntro
