import { Avatar, Button, Modal } from "antd"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/router"
import { useContext, useState } from "react"
import type { Goal } from "../../types/goal"
import GoalFixModal from "./GoalFixModal"
import { UserContext } from "src/components/UserProvider"
import { createdByToString } from "src/utils/createdByToString"
import { dateFormatter } from "src/utils/dateFormatter"

type Props = {
	goal: Goal
}
const Goal: React.FC<Props> = (props) => {
	const router = useRouter()
	const { me, getGoals, users } = useContext(UserContext)
	const [shouldShowMenuModal, setShouldShowMenuModal] = useState(false)
	const [shouldShowFixModal, setShouldShowFixModal] = useState(false)

	function handleClick() {
		setShouldShowFixModal(true)
		setShouldShowMenuModal(false)
	}
	function handleComplete() {
		axios
			.put(process.env.NEXT_PUBLIC_URL + "/api/goals/" + props.goal.id, {
				title: props.goal.title,
				comment: props.goal.comment,
				goalDate: props.goal.goalDate,
				isCompleted: true,
				createdBy: me.id,
			})
			.then(() => getGoals(router.asPath === "/user/me" ? me.id : ""))
			.catch((err) => alert(err))
	}
	function handleFavorite() {
		axios
			.put(
				process.env.NEXT_PUBLIC_URL + "/api/goals/favorite/" + props.goal.id,
				{
					createdBy: me.id,
				}
			)
			.then(() => getGoals(router.asPath === "/user/me" ? me.id : ""))
			.catch((err) => alert(err))
	}
	function handleDelete() {
		axios
			.delete(process.env.NEXT_PUBLIC_URL + "/api/goals/" + props.goal.id)
			.then(() => getGoals(router.asPath === "/user/me" ? me.id : ""))
			.catch((err) => alert(err))
		setShouldShowMenuModal(false)
	}
	return (
		<>
			<div className="border-2 p-2">
				<div className="flex justify-between">
					<Link passHref href={"/user/" + props.goal.createdBy}>
						<div className="flex items-center justify-center">
							<Avatar className="mr-2">
								{createdByToString(props.goal.createdBy, users).substring(0, 1)}
							</Avatar>
							<span className="text-lg text-xl">
								{createdByToString(props.goal.createdBy, users)}
							</span>
						</div>
					</Link>
					<div className="flex">
						<div className="flex items-center">
							<p className="mr-2">{dateFormatter(props.goal.createdAt)}</p>
							{me.id === props.goal.createdBy ? (
								<>
									<Button
										className="border-full text-12 w-12 font-bold"
										type="text"
										onClick={() => setShouldShowMenuModal(true)}
									>
										・・・
									</Button>
									<Modal
										className="absolute right-0 top-0"
										footer={null}
										mask={false}
										visible={shouldShowMenuModal}
										width={200}
										onCancel={() => setShouldShowMenuModal(false)}
									>
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
									</Modal>
								</>
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
					{props.goal.isCompleted ? (
						<Button disabled={true}>完了済み</Button>
					) : (
						<Button onClick={handleComplete}>この目標を完了する</Button>
					)}
					<Button onClick={handleFavorite}>
						いいね！ {props.goal.favoriteNum}
					</Button>
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
