import { useQueryClient } from "@tanstack/react-query"
import { Button, Form, Input, InputNumber, Upload } from "antd"
import { RcFile } from "antd/lib/upload"
import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import { postRecord, putRecord } from "../../apis/record"
import { postFile } from "src/apis/file"
import { meState } from "src/recoil/atoms/user"
import type { RecordRequest } from "src/types/record"

const { TextArea } = Input

interface Props {
	defaultValues?: {
		title: string
		page: number
		time: number
		comment: string
	}
	id?: string
	setShouldShowFixModal?: (value: boolean) => void
}

const RecordForm: React.FC<Props> = ({
	defaultValues,
	id,
	setShouldShowFixModal,
}) => {
	const me = useRecoilValue(meState)
	const [title, setTitle] = useState("")
	const [page, setPage] = useState(0)
	const [time, setTime] = useState(0)
	const [comment, setComment] = useState("")
	const [file, setFile] = useState<File | null>(null)
	const queryClient = useQueryClient()
	const [form] = Form.useForm()
	const isFixMode = id !== undefined

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
		if (title === "" || (page == 0 && time == 0)) {
			alert(
				"タイトルは必須です。ページ数と時間のどちらかは1以上を入力してください。"
			)
			return
		}
		let data: RecordRequest = {
			title: title,
			page: page,
			time: time,
			comment: comment,
			createdBy: me.id,
		}
		if (isFixMode) {
			data = {
				title: title,
				page: page,
				time: time,
				comment: comment,
				createdBy: me.id,
			}
		}
		if (file && !isFixMode) {
			const formData = new FormData()
			formData.append("file", file as RcFile)
			formData.append("userID", me.id)
			const res = await postFile(formData)
			data = { ...data, fileId: res.id }
		}

		if (!isFixMode) {
			await postRecord(data)
		} else {
			await putRecord(id, data)
			setShouldShowFixModal!(false)
		}
		setTitle("")
		setPage(0)
		setTime(0)
		setComment("")
		setFile(null)
		form.resetFields()
		queryClient.invalidateQueries(["records"])
	}

	useEffect(() => {
		if (isFixMode) {
			setTitle(defaultValues!.title)
			setPage(defaultValues!.page)
			setTime(defaultValues!.time)
			setComment(defaultValues!.comment)
		}
	}, [
		defaultValues?.title,
		defaultValues?.page,
		defaultValues?.time,
		defaultValues?.comment,
	])

	return (
		<Form
			className={`${!isFixMode && "p-4"}`}
			form={form}
			labelCol={{ span: 5 }}
			onFinish={handleSubmit}
		>
			<Form.Item
				initialValue={defaultValues?.title}
				label="タイトル"
				name="title"
			>
				<Input
					placeholder="必須項目"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</Form.Item>
			<Form.Item
				initialValue={defaultValues?.page}
				label="ページ数"
				name="pages"
			>
				<InputNumber
					controls
					min={0}
					value={page}
					onChange={(value) => setPage(value)}
				/>
			</Form.Item>
			<Form.Item
				initialValue={defaultValues?.time}
				label="時間(分)"
				name="time"
			>
				<InputNumber
					controls
					min={0}
					value={time}
					onChange={(value) => setTime(value)}
				/>
			</Form.Item>
			<Form.Item
				initialValue={defaultValues?.comment}
				label="コメント"
				name="comment"
			>
				<TextArea
					placeholder="任意"
					rows={4}
					value={comment}
					onChange={(e) => setComment(e.target.value)}
				/>
			</Form.Item>
			{!isFixMode && (
				<Form.Item label="画像" name="image">
					<Upload {...uploadProps}>
						<Button>画像をアップロード</Button>
					</Upload>
				</Form.Item>
			)}
			<Form.Item>
				<Button htmlType="submit">記録する</Button>
			</Form.Item>
		</Form>
	)
}

export default RecordForm
