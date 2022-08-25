import { useQuery } from "@tanstack/react-query"
import { Avatar, Button } from "antd"
import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import UserFixModal from "./UserFixModal"
import { fetchRecords } from "src/apis/record"
import { meState } from "src/recoil/atoms/user"
import type { UserResponse } from "src/types/user"
import { minutesToHoursAndMinutes } from "src/utils/minutesToHoursAndMinutes"

type Props = {
	user: UserResponse
}
const UserIntro: React.FC<Props> = (props) => {
	const {
		isLoading,
		isError,
		data: records,
	} = useQuery(["records"], () => fetchRecords())
	const [username, setUsername] = useState(props.user.name)
	const [description, setDescription] = useState(props.user.description)
	const me = useRecoilValue(meState)
	const [shouldShowFixModal, setShouldShowFixModal] = useState(false)

	useEffect(() => {
		setUsername(props.user.name)
		setDescription(props.user.description)
	}, [props.user.description, props.user.name])

	if (isLoading) {
		return <div>Loading...</div>
	}
	if (isError) {
		return <div>Error!</div>
	}

	const fullStudyTime = records.reduce((acc, record) => {
		return acc + record.time
	}, 0)

	return (
		<>
			<div className="p-4">
				<div className="flex items-center">
					<Avatar className="mr-2">{username.substring(0, 1)}</Avatar>
					<p className="text-2xl">{username}</p>
					{me.id === props.user.id ? (
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
					<p className="whitespace-pre-wrap">{description}</p>
				</div>
			</div>
			<UserFixModal
				setShouldShowFixModal={setShouldShowFixModal}
				shouldShowFixModal={shouldShowFixModal}
				user={props.user}
			/>
		</>
	)
}

export default UserIntro
