import { Button, Form, Input } from "antd"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "src/components/UserProvider"

type Props = {
	defaultTitle: string
	defaultPage: string
	defaultTime: string
	defaultComment: string
	id: string
	setShouldShowFixModal: (value: boolean) => void
}

const { TextArea } = Input

const RecordForm: React.FC<Props> = ({
	defaultTitle,
	defaultPage,
	defaultTime,
	defaultComment,
	id = "",
	setShouldShowFixModal,
}) => {
	const { me, getRecords } = useContext(UserContext)
	const [title, setTitle] = useState("")
	const [page, setPage] = useState("")
	const [time, setTime] = useState("")
	const [comment, setComment] = useState("")
	useEffect(() => {
		setTitle(defaultTitle)
		setPage(defaultPage)
		setTime(defaultTime)
		setComment(defaultComment)
	}, [defaultTitle, defaultPage, defaultTime, defaultComment]) //propsからuseStateに入れるときはこれしないといけないみたいなやつ

	function handleSubmit() {
		if (title === "" || (!/[0-9]+/.test(time) && !/[0-9]+/.test(page))) {
			alert("タイトルは必須です。ページと時間は半角数字で入力してください。")
			return
		}
		axios
			.put(process.env.NEXT_PUBLIC_URL + "/api/records/" + id, {
				title: title,
				page: Number(page),
				time: Number(time),
				comment: comment,
				createdBy: me.id,
			})
			.then(() => {
				getRecords()
				setTitle("")
				setPage("")
				setTime("")
				setComment("")
				setShouldShowFixModal(false)
			})
			.catch((err) => alert(err))
	}

	return (
		<Form onFinish={handleSubmit}>
			<Form.Item label="タイトル" name="title">
				<Input
					placeholder="必須項目"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</Form.Item>
			<Form.Item label="ページ数" name="pages">
				<Input
					placeholder="半角数字(任意)"
					value={page}
					onChange={(e) => setPage(e.target.value)}
				/>
			</Form.Item>
			<Form.Item label="時間" name="time">
				<Input
					placeholder="半角数字(任意)"
					value={time}
					onChange={(e) => setTime(e.target.value)}
				/>
			</Form.Item>
			<Form.Item label="コメント" name="comment">
				<TextArea
					placeholder="任意"
					rows={4}
					value={comment}
					onChange={(e) => setComment(e.target.value)}
				/>
			</Form.Item>
			<Form.Item>
				<Button htmlType="submit">記録する</Button>
			</Form.Item>
		</Form>
	)
}

export default RecordForm
