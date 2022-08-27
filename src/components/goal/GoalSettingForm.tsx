import { title } from "process"
import { Button, Form, Input } from "antd"
import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import { useSWRConfig } from "swr"
import { postGoal, putGoal } from "../../apis/goal"
import { meState } from "src/recoil/atoms/user"
import type { GoalRequest } from "src/types/goal"

const { TextArea } = Input

interface Props {
	defaultValues?: {
		title: string
		goalDate: string
		comment: string
		isCompleted: boolean
	}
	id?: string
	setShouldShowFixModal?: (value: boolean) => void
}

const GoalSettingForm: React.FC<Props> = ({
	defaultValues,
	id,
	setShouldShowFixModal,
}) => {
	const me = useRecoilValue(meState)
	const [formValue, setFormValue] = useState<GoalRequest>({
		title: "",
		goalDate: "",
		comment: "",
		isCompleted: false,
		createdBy: me.id,
	})
	const [form] = Form.useForm()
	const isFixMode = id !== undefined
	const { mutate } = useSWRConfig()

	async function handleSubmit() {
		if (
			title === "" ||
			!/^2[0-9]{3}-[0-9]{2}-[0-9]{2}$/.test(formValue.goalDate)
		) {
			alert("タイトルは必須です。期限はyyyy-MM-ddの形式で入力してください。")
			return
		}
		const data: GoalRequest = { ...formValue }
		if (!isFixMode) {
			try {
				await postGoal(data)
			} catch (e) {
				alert(e)
				return
			}
		} else {
			try {
				await putGoal(id, data)
			} catch (e) {
				alert(e)
				return
			}
			setShouldShowFixModal!(false)
		}
		setFormValue({
			title: "",
			goalDate: "",
			comment: "",
			isCompleted: false,
			createdBy: me.id,
		})
		form.resetFields()
		mutate(`${process.env.NEXT_PUBLIC_URL}/api/goals`)
	}

	useEffect(() => {
		if (isFixMode) {
			setFormValue({
				title: defaultValues!.title,
				goalDate: defaultValues!.goalDate,
				comment: defaultValues!.comment,
				isCompleted: defaultValues!.isCompleted,
				createdBy: me.id,
			})
		}
	}, [defaultValues?.title, defaultValues?.goalDate, defaultValues?.comment])

	return (
		<Form
			className={`${!isFixMode && "p-4"}`}
			form={form}
			labelCol={{ span: 4 }}
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
				initialValue={defaultValues?.goalDate}
				label="期限"
				name="goalDate"
			>
				<Input
					placeholder="YYYY-MM-DD"
					value={formValue.goalDate}
					onChange={(e) =>
						setFormValue({ ...formValue, goalDate: e.target.value })
					}
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
			<Form.Item>
				<Button htmlType="submit">目標を設定</Button>
			</Form.Item>
		</Form>
	)
}

export default GoalSettingForm
