import { useQueryClient } from "@tanstack/react-query"
import { Button, Form, Input, Upload } from "antd"
import { RcFile } from "antd/lib/upload"
import { useState } from "react"
import { useRecoilValue } from "recoil"
import { postRecord } from "../../apis/record"
import { postFile } from "src/apis/file"
import { meState } from "src/recoil/atoms/user"
import type { RecordPostRequest } from "src/types/record"

const { TextArea } = Input

const RecordForm: React.FC = () => {
	const me = useRecoilValue(meState)
	const [title, setTitle] = useState("")
	const [page, setPage] = useState("")
	const [time, setTime] = useState("")
	const [comment, setComment] = useState("")
	const [file, setFile] = useState<File | null>(null)
	const queryClient = useQueryClient()
	const [form] = Form.useForm()

	const uploadProps = {
		beforeUpload: (file: any) => {
			setFile(file)
			return false
		},
		onRemove: () => {
			setFile(null)
		},
		file,
	}

	async function handleSubmit() {
		if (title === "" || (!/[0-9]+/.test(time) && !/[0-9]+/.test(page))) {
			console.log(title, time, page)
			alert("タイトルは必須です。ページと時間は半角数字で入力してください。")
			return
		}
		const data: RecordPostRequest = {
			title: title,
			page: Number(page),
			time: Number(time),
			comment: comment,
			fileId: null,
			createdBy: me.id,
		}
		if (file) {
			const formData = new FormData()
			formData.append("file", file as RcFile)
			formData.append("userID", me.id)
			const res = await postFile(formData)
			data.fileId = res.id
		}

		await postRecord(data)
		setTitle("")
		setPage("")
		setTime("")
		setComment("")
		setFile(null)
		form.resetFields()
		queryClient.invalidateQueries(["records"])
	}

	return (
		<Form form={form} labelCol={{ span: 5 }} onFinish={handleSubmit}>
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
			<Form.Item label="画像" name="image">
				<Upload {...uploadProps}>
					<Button>画像をアップロード</Button>
				</Upload>
			</Form.Item>
			<Form.Item>
				<Button htmlType="submit">記録する</Button>
			</Form.Item>
		</Form>
	)
}

export default RecordForm
