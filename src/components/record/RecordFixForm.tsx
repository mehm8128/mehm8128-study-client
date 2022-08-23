import { useQueryClient } from "@tanstack/react-query"
import { Button, Form, Input } from "antd"
import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import { putRecord } from "../../apis/record"
import { meState } from "src/recoil/atoms/user"
import type { RecordPutRequest } from "src/types/record"

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
	const me = useRecoilValue(meState)
	const [title, setTitle] = useState("")
	const [page, setPage] = useState("")
	const [time, setTime] = useState("")
	const [comment, setComment] = useState("")
	const queryClient = useQueryClient()
	const [form] = Form.useForm()

	useEffect(() => {
		setTitle(defaultTitle)
		setPage(defaultPage)
		setTime(defaultTime)
		setComment(defaultComment)
	}, [defaultTitle, defaultPage, defaultTime, defaultComment]) //propsからuseStateに入れるときはこれしないといけないみたいなやつ

	async function handleSubmit() {
		if (title === "" || (!/[0-9]+/.test(time) && !/[0-9]+/.test(page))) {
			alert("タイトルは必須です。ページと時間は半角数字で入力してください。")
			return
		}
		const data: RecordPutRequest = {
			title: title,
			page: Number(page),
			time: Number(time),
			comment: comment,
			createdBy: me.id,
		}
		await putRecord(id, data)
		setTitle("")
		setPage("")
		setTime("")
		setComment("")
		setShouldShowFixModal(false)
		form.resetFields()
		queryClient.invalidateQueries(["records"])
	}

	return (
		<Form form={form} labelCol={{ span: 3 }} onFinish={handleSubmit}>
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
