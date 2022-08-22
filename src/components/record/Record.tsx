import { Avatar, Button, Modal } from "antd"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/router"
import { useContext, useState } from "react"

import { RecordType } from "../../types/record"
import { UserContext } from "../UserProvider"
import RecordFixModal from "./RecordFixModal"
import { createdByToString } from "src/utils/createdByToString"
import { dateFormatter } from "src/utils/dateFormatter"

type Props = {
	record: RecordType
}
const Record: React.FC<Props> = (props) => {
	const router = useRouter()
	const { me, getRecords, users } = useContext(UserContext)
	const [shouldShowMenuModal, setShouldShowMenuModal] = useState(false)
	const [shouldShowFixModal, setShouldShowFixModal] = useState(false)

	function handleClick() {
		setShouldShowFixModal(true)
		setShouldShowMenuModal(false)
	}
	function handleFavorite() {
		axios
			.put(
				process.env.NEXT_PUBLIC_URL +
					"/api/records/favorite/" +
					props.record.id,
				{
					createdBy: me.id,
				}
			)
			.then(() => getRecords(router.asPath === "/user/me" ? me.id : ""))
			.catch((err) => alert(err))
	}
	function handleDelete() {
		axios
			.delete(process.env.NEXT_PUBLIC_URL + "/api/records/" + props.record.id)
			.then(() => getRecords(router.asPath === "/user/me" ? me.id : ""))
			.catch((err) => alert(err))
		setShouldShowMenuModal(false)
	}
	return (
		<>
			<div className="border-2 p-2">
				<div className="flex justify-between">
					<Link passHref href={"/user/" + props.record.createdBy}>
						<div className="flex items-center justify-center">
							<Avatar className="mr-2">
								{createdByToString(props.record.createdBy, users).substring(
									0,
									1
								)}
							</Avatar>
							<span className="text-lg text-xl">
								{createdByToString(props.record.createdBy, users)}
							</span>
						</div>
					</Link>
					<div className="flex">
						<div className="flex items-center">
							<p className="mr-2">{dateFormatter(props.record.createdAt)}</p>
							{me.id === props.record.createdBy ? (
								<div className="relative">
									<Button
										className="border-full text-12 relative w-12 font-bold"
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
													この記録を編集する
												</Button>
											</li>
											<li>
												<Button type="text" onClick={handleDelete}>
													この記録を削除する
												</Button>
											</li>
										</ul>
									</Modal>
								</div>
							) : null}
						</div>
					</div>
				</div>
				<div className="mb-4 ml-12">
					<h3>{props.record.title}</h3>
					<p>
						{props.record.time ? props.record.time + "分、" : ""}
						{props.record.page ? props.record.page + "ページ " : ""}
						勉強しました！
					</p>
					<p className="whitespace-pre-wrap">{props.record.comment}</p>
				</div>
				<div className="flex items-center justify-evenly">
					<Button onClick={handleFavorite}>
						いいね！ {props.record.favoriteNum}
					</Button>
				</div>
			</div>
			<RecordFixModal
				record={props.record}
				setShouldShowFixModal={setShouldShowFixModal}
				shoudShowFixModal={shouldShowFixModal}
			/>
		</>
	)
}

export default Record
