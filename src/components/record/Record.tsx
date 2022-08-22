import { useDisclosure } from "@chakra-ui/react"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/router"
import { useContext } from "react"

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
	const { isOpen, onOpen, onClose } = useDisclosure()
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
		if (me.id === props.record.createdBy) {
			axios
				.delete(process.env.NEXT_PUBLIC_URL + "/api/records/" + props.record.id)
				.then(() => getRecords(router.asPath === "/user/me" ? me.id : ""))
				.catch((err) => alert(err))
		}
	}
	return (
		<>
			<div className="border-2 p-2">
				<div className="flex justify-between">
					<Link passHref href={"/user/" + props.record.createdBy}>
						<div className="flex items-center justify-center">
							<div className="avatar placeholder mr-2">
								<div className="w-12 rounded-full bg-green-300">
									{createdByToString(props.record.createdBy, users).substring(
										0,
										1
									)}
								</div>
							</div>
							<span className="text-lg text-xl">
								{createdByToString(props.record.createdBy, users)}
							</span>
						</div>
					</Link>
					<div className="flex">
						<div className="flex items-center">
							<p className="mr-2">{dateFormatter(props.record.createdAt)}</p>
							{me.id === props.record.createdBy ? (
								<>
									<label
										className="border-full text-12 btn modal-button w-12 font-bold"
										htmlFor="recordMenu"
									>
										・・・
									</label>
									<input
										className="modal-toggle"
										id="recordMenu"
										type="checkbox"
									/>
									<label className="modal" htmlFor="recordMenu">
										<ul className="modal-box menu">
											<li>
												<label htmlFor="recordMenu" onClick={onOpen}>
													この記録を編集する
												</label>
											</li>
											<li>
												<label htmlFor="recordMenu" onClick={handleDelete}>
													この記録を削除する
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
					<h3>{props.record.title}</h3>
					<p>
						{props.record.time ? props.record.time + "分、" : ""}
						{props.record.page ? props.record.page + "ページ " : ""}
						勉強しました！
					</p>
					<p className="whitespace-pre-wrap">{props.record.comment}</p>
				</div>
				<div className="flex items-center justify-evenly">
					<button className="btn" onClick={handleFavorite}>
						いいね！ {props.record.favoriteNum}
					</button>
				</div>
			</div>
			<RecordFixModal isOpen={isOpen} record={props.record} onClose={onClose} />
		</>
	)
}

export default Record
