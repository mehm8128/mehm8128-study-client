import { useDisclosure } from "@chakra-ui/react"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/router"
import { useContext } from "react"
import { GoalType } from "../../types/goal"
import GoalFixModal from "./GoalFixModal"
import { UserContext } from "src/components/UserProvider"
import { createdByToString } from "src/utils/createdByToString"
import { dateFormatter } from "src/utils/dateFormatter"

type Props = {
	goal: GoalType
}
const Goal: React.FC<Props> = (props) => {
	const router = useRouter()
	const { me, getGoals, users } = useContext(UserContext)
	const { isOpen, onOpen, onClose } = useDisclosure()
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
		if (me.id === props.goal.createdBy) {
			axios
				.delete(process.env.NEXT_PUBLIC_URL + "/api/goals/" + props.goal.id)
				.then(() => getGoals(router.asPath === "/user/me" ? me.id : ""))
				.catch((err) => alert(err))
		}
	}
	return (
		<>
			<div className="border-2 p-2">
				<div className="flex justify-between">
					<Link passHref href={"/user/" + props.goal.createdBy}>
						<div className="flex items-center justify-center">
							<div className="avatar placeholder mr-2">
								<div className="w-12 rounded-full bg-green-300">
									{createdByToString(props.goal.createdBy, users).substring(
										0,
										1
									)}
								</div>
							</div>
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
									<label
										className="border-full text-12 btn modal-button w-12 font-bold"
										htmlFor="goalMenu"
									>
										・・・
									</label>
									<input
										className="modal-toggle"
										id="goalMenu"
										type="checkbox"
									/>
									<label className="modal" htmlFor="goalMenu">
										<ul className="modal-box menu">
											<li>
												<label htmlFor="goalMenu" onClick={onOpen}>
													この目標を編集する
												</label>
											</li>
											<li>
												<label htmlFor="goalMenu" onClick={handleDelete}>
													この目標を削除する
												</label>
											</li>
										</ul>
									</label>
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
						<button className="btn" disabled={true}>
							完了済み
						</button>
					) : (
						<button className="btn" onClick={handleComplete}>
							この目標を完了する
						</button>
					)}
					<button className="btn" onClick={handleFavorite}>
						いいね！ {props.goal.favoriteNum}
					</button>
				</div>
			</div>
			<GoalFixModal goal={props.goal} isOpen={isOpen} onClose={onClose} />
		</>
	)
}

export default Goal
