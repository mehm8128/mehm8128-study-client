import { Avatar, Button, Popover } from "antd"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import { useSWRConfig } from "swr"
import { deleteGoal, putGoal, putGoalFavorite } from "../../apis/goal"
import type { GoalRequest, GoalResponse } from "../../types/goal"
import GoalFixModal from "./GoalFixModal"
import { useFetchUsers } from "src/apis/user"
import { meState } from "src/recoil/atoms/user"
import type { GoalFavoritePutRequest } from "src/types/favorite"
import { dateFormatter } from "src/utils/dateFormatter"
import { userIdToName } from "src/utils/userIdToName"

interface Props {
	goal: GoalResponse
}

const Goal: React.FC<Props> = (props) => {
	const me = useRecoilValue(meState)
	const { data: users, isError } = useFetchUsers()
	const [shouldShowMenuModal, setShouldShowMenuModal] = useState(false)
	const [shouldShowFixModal, setShouldShowFixModal] = useState(false)
	const [favoriteNum, setFavoriteNum] = useState(0)
	const [isCompleted, setIsCompleted] = useState(false)
	const { mutate } = useSWRConfig()

	function handleClick() {
		setShouldShowFixModal(true)
		setShouldShowMenuModal(false)
	}
	async function handleComplete() {
		const data: GoalRequest = {
			title: props.goal.title,
			comment: props.goal.comment,
			goalDate: props.goal.goalDate,
			isCompleted: true,
			createdBy: me.id,
		}
		setIsCompleted(true)
		try {
			await putGoal(props.goal.id, data)
		} catch (e) {
			alert(e)
		}
	}
	async function handleFavorite() {
		const data: GoalFavoritePutRequest = {
			createdBy: me.id,
		}
		setFavoriteNum((prev) => prev + 1)
		try {
			await putGoalFavorite(props.goal.id, data)
		} catch (e) {
			alert(e)
			setFavoriteNum((prev) => prev - 1)
		}
	}
	async function handleDelete() {
		try {
			await deleteGoal(props.goal.id)
		} catch (e) {
			alert(e)
			return
		}
		mutate(`${process.env.NEXT_PUBLIC_URL}/api/goals`)
		setShouldShowMenuModal(false)
	}

	useEffect(() => {
		setFavoriteNum(props.goal.favoriteNum)
		setIsCompleted(props.goal.isCompleted)
	}, [props.goal.favoriteNum, props.goal.isCompleted])

	if (!users) {
		return <div>Loading...</div>
	}
	if (isError) {
		return <div>Error!</div>
	}

	return (
		<>
			<div className="border-2 p-2 text-lg">
				<div className="flex justify-between">
					<Link passHref href={"/user/" + props.goal.createdBy}>
						<div className="flex items-center justify-center">
							<Avatar className="mr-2">
								{userIdToName(props.goal.createdBy, users).substring(0, 1)}
							</Avatar>
							<span className="text-xl">
								{userIdToName(props.goal.createdBy, users)}
							</span>
						</div>
					</Link>
					<div className="flex">
						<div className="flex items-center">
							<p className="mr-2">{dateFormatter(props.goal.createdAt)}</p>
							{me.id === props.goal.createdBy ? (
								<Popover
									content={
										<ul>
											<li>
												<Button type="text" onClick={handleClick}>
													この目標を編集する
												</Button>
											</li>
											<li>
												<Button type="text" onClick={handleDelete}>
													この目標を削除する
												</Button>
											</li>
										</ul>
									}
									trigger="click"
									visible={shouldShowMenuModal}
									onVisibleChange={setShouldShowMenuModal}
								>
									<Button
										className="border-full text-12 w-12 font-bold"
										type="text"
									>
										・・・
									</Button>
								</Popover>
							) : null}
						</div>
					</div>
				</div>
				<div className="mb-4 ml-12">
					<p>目標を設定しました！</p>
					<h3>{props.goal.title}</h3>
					<p>期限：{props.goal.goalDate}</p>
					<p className="whitespace-pre-wrap">{props.goal.comment}</p>
				</div>
				<div className="flex items-center justify-evenly">
					{isCompleted ? (
						<Button disabled={true}>完了済み</Button>
					) : (
						<Button onClick={handleComplete}>この目標を完了する</Button>
					)}
					<Button onClick={handleFavorite}>いいね！ {favoriteNum}</Button>
				</div>
			</div>
			<GoalFixModal
				goal={props.goal}
				setShouldShowFixModal={setShouldShowFixModal}
				shoudShowFixModal={shouldShowFixModal}
			/>
		</>
	)
}

export default Goal
