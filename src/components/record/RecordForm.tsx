import { Button, Form, Input, InputNumber, Upload } from "antd"
import { RcFile } from "antd/lib/upload"
import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import { useSWRConfig } from "swr"
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
	const [formValue, setFormValue] = useState<RecordRequest>({
		title: "",
		page: 0,
		time: 0,
		comment: "",
		createdBy: me.id,
	})
	const [file, setFile] = useState<File | null>(null)
	const [form] = Form.useForm()
	const isFixMode = id !== undefined
	const { mutate } = useSWRConfig()

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
		if (
			formValue.title === "" ||
			(formValue.page == 0 && formValue.time == 0)
		) {
			alert(
				"タイトルは必須です。ページ数と時間のどちらかは1以上を入力してください。"
			)
			return
		}
		let data: RecordRequest = { ...formValue }
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
		setFormValue({
			title: "",
			page: 0,
			time: 0,
			comment: "",
			createdBy: me.id,
		})
		setFile(null)
		form.resetFields()
		mutate(`${process.env.NEXT_PUBLIC_URL}/api/records`)
	}

	useEffect(() => {
		if (isFixMode) {
			setFormValue({
				title: defaultValues!.title,
				page: defaultValues!.page,
				time: defaultValues!.time,
				comment: defaultValues!.comment,
				createdBy: me.id,
			})
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
					value={formValue.title}
					onChange={(e) =>
						setFormValue({ ...formValue, title: e.target.value })
					}
				/>
			</Form.Item>
			<Form.Item
				initialValue={defaultValues?.page}
				label="ページ数"
				name="pages"
			>
				<InputNumber
					controls
					defaultValue={0}
					min={0}
					value={formValue.page}
					onChange={(value) => setFormValue({ ...formValue, page: value })}
				/>
			</Form.Item>
			<Form.Item
				initialValue={defaultValues?.time}
				label="時間(分)"
				name="time"
			>
				<InputNumber
					controls
					defaultValue={0}
					min={0}
					value={formValue.time}
					onChange={(value) => setFormValue({ ...formValue, time: value })}
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
					value={formValue.comment}
					onChange={(e) =>
						setFormValue({ ...formValue, comment: e.target.value })
					}
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
