import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Avatar, Button, Popover } from "antd"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import { deleteGoal, putGoal, putGoalFavorite } from "../../apis/goal"
import type { GoalPutRequest, GoalResponse } from "../../types/goal"
import GoalFixModal from "./GoalFixModal"
import { fetchUsers } from "src/apis/user"
import { meState } from "src/recoil/atoms/user"
import type { GoalFavoritePutRequest } from "src/types/favorite"
import { createdByToString } from "src/utils/createdByToString"
import { dateFormatter } from "src/utils/dateFormatter"

type Props = {
	goal: GoalResponse
}

const Goal: React.FC<Props> = (props) => {
	const me = useRecoilValue(meState)
	const {
		isLoading,
		isError,
		data: users,
	} = useQuery(["users"], () => fetchUsers())
	const [shouldShowMenuModal, setShouldShowMenuModal] = useState(false)
	const [shouldShowFixModal, setShouldShowFixModal] = useState(false)
	const queryClient = useQueryClient()
	const [favoriteNum, setFavoriteNum] = useState(0)
	const [isCompleted, setIsCompleted] = useState(false)

	function handleClick() {
		setShouldShowFixModal(true)
		setShouldShowMenuModal(false)
	}
	async function handleComplete() {
		const data: GoalPutRequest = {
			title: props.goal.title,
			comment: props.goal.comment,
			goalDate: props.goal.goalDate,
			isCompleted: true,
			createdBy: me.id,
		}
		await putGoal(props.goal.id, data)
		setIsCompleted(true)
	}
	async function handleFavorite() {
		const data: GoalFavoritePutRequest = {
			createdBy: me.id,
		}
		await putGoalFavorite(props.goal.id, data)
		setFavoriteNum(favoriteNum + 1)
	}
	async function handleDelete() {
		await deleteGoal(props.goal.id)
		queryClient.invalidateQueries(["goals"])
		setShouldShowMenuModal(false)
	}

	useEffect(() => {
		setFavoriteNum(props.goal.favoriteNum)
		setIsCompleted(props.goal.isCompleted)
	}, [props.goal.favoriteNum, props.goal.isCompleted])

	if (isLoading) {
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
								{createdByToString(props.goal.createdBy, users).substring(0, 1)}
							</Avatar>
							<span className="text-xl">
								{createdByToString(props.goal.createdBy, users)}
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
