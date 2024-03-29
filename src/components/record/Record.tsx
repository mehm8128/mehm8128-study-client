import { Avatar, Button, Modal, Popover } from "antd"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

import { useRecoilValue } from "recoil"
import { useSWRConfig } from "swr"
import { deleteRecord, putRecordFavorite } from "../../apis/record"
import type { RecordResponse } from "../../types/record"
import RecordFixModal from "./RecordFixModal"
import { useFetchUsers } from "src/apis/user"
import { meState } from "src/recoil/atoms/user"
import { dateFormatter } from "src/utils/dateFormatter"
import { userIdToName } from "src/utils/userIdToName"

interface Props {
	record: RecordResponse
}

const Record: React.FC<Props> = (props) => {
	const me = useRecoilValue(meState)
	const { data: users, isError } = useFetchUsers()
	const [shouldShowMenuModal, setShouldShowMenuModal] = useState(false)
	const [shouldShowFixModal, setShouldShowFixModal] = useState(false)
	const [shouldShowImageModal, setShouldShowImageModal] = useState(false)
	const [favoriteNum, setFavoriteNum] = useState(0)
	const { mutate } = useSWRConfig()

	function handleClick() {
		setShouldShowFixModal(true)
		setShouldShowMenuModal(false)
	}
	async function handleFavorite() {
		const data = {
			createdBy: me.id,
		}
		setFavoriteNum((prev) => prev + 1)
		try {
			await putRecordFavorite(props.record.id, data)
		} catch (e) {
			alert(e)
			setFavoriteNum((prev) => prev - 1)
		}
	}
	async function handleDelete() {
		try {
			await deleteRecord(props.record.id)
		} catch (e) {
			alert(e)
			return
		}
		mutate(`${process.env.NEXT_PUBLIC_URL}/api/records`)
		setShouldShowMenuModal(false)
	}

	useEffect(() => {
		setFavoriteNum(props.record.favoriteNum)
	}, [props.record.favoriteNum])

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
					<Link passHref href={"/user/" + props.record.createdBy}>
						<div className="flex items-center justify-center">
							<Avatar className="mr-2">
								{userIdToName(props.record.createdBy, users).substring(0, 1)}
							</Avatar>
							<span className="text-xl">
								{userIdToName(props.record.createdBy, users)}
							</span>
						</div>
					</Link>
					<div className="flex">
						<div className="flex items-center">
							<p className="mr-2">{dateFormatter(props.record.createdAt)}</p>
							{me.id === props.record.createdBy ? (
								<Popover
									content={
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
									}
									open={shouldShowMenuModal}
									trigger="click"
									onOpenChange={setShouldShowMenuModal}
								>
									<Button
										className="border-full text-12 relative w-12 font-bold"
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
					<h3>{props.record.title}</h3>
					<p>
						{props.record.time ? props.record.time + "分、" : ""}
						{props.record.page ? props.record.page + "ページ " : ""}
						勉強しました！
					</p>
					<p className="whitespace-pre-wrap">{props.record.comment}</p>
				</div>
				{props.record.fileId !== "00000000-0000-0000-0000-000000000000" && (
					<div className="ml-20 h-32">
						<Button type="text" onClick={() => setShouldShowImageModal(true)}>
							<Image
								alt=""
								className="object-cover"
								height={120}
								src={`${process.env.NEXT_PUBLIC_URL}/api/files/${props.record.fileId}`}
								width={120}
							/>
						</Button>
						<Modal
							footer={null}
							open={shouldShowImageModal}
							width={600}
							onCancel={() => setShouldShowImageModal(false)}
						>
							<Image
								alt=""
								className="object-cover"
								height={600}
								src={`${process.env.NEXT_PUBLIC_URL}/api/files/${props.record.fileId}`}
								width={600}
							/>
						</Modal>
					</div>
				)}
				<div className="flex items-center justify-evenly">
					<Button onClick={handleFavorite}>いいね！ {favoriteNum}</Button>
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
