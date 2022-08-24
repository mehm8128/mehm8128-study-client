import { useQueryClient } from "@tanstack/react-query"
import { Button, Form, Input } from "antd"
import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import { fetchGoals, postGoal, putGoal } from "../../apis/goal"
import { meState } from "src/recoil/atoms/user"
import type { GoalPostRequest } from "src/types/goal"

const { TextArea } = Input

interface Props {
	defaultValues?: {
		title: string
		goalDate: string
		comment: string
	}
	isCompleted?: boolean
	id?: string
	setShouldShowFixModal?: (value: boolean) => void
}

const GoalSettingForm: React.FC<Props> = ({
	isCompleted,
	defaultValues,
	id,
	setShouldShowFixModal,
}) => {
	const me = useRecoilValue(meState)
	const [title, setTitle] = useState("")
	const [goalDate, setGoalDate] = useState("")
	const [comment, setComment] = useState("")
	const queryClient = useQueryClient()
	const [form] = Form.useForm()
	const isFixMode = id !== undefined

	async function handleSubmit() {
		if (title === "" || !/^2[0-9]{3}-[0-9]{2}-[0-9]{2}$/.test(goalDate)) {
			alert("タイトルは必須です。期限はyyyy-MM-ddの形式で入力してください。")
			return
		}
		const data: GoalPostRequest = {
			title: title,
			goalDate: goalDate,
			comment: comment,
			isCompleted: isCompleted ?? false,
			createdBy: me.id,
		}
		if (!isFixMode) {
			await postGoal(data)
		} else {
			await putGoal(id, data)
			setShouldShowFixModal!(false)
		}
		fetchGoals()
		setTitle("")
		setGoalDate("")
		setComment("")
		form.resetFields()
		queryClient.invalidateQueries(["goals"])
	}

	useEffect(() => {
		if (isFixMode) {
			setTitle(defaultValues!.title)
			setGoalDate(defaultValues!.goalDate)
			setComment(defaultValues!.comment)
		}
	}, [defaultValues?.title, defaultValues?.goalDate, defaultValues?.comment])

	return (
		<Form form={form} labelCol={{ span: 4 }} onFinish={handleSubmit}>
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
				initialValue={defaultValues?.goalDate}
				label="期限"
				name="goalDate"
			>
				<Input
					placeholder="YYYY-MM-DD"
					value={goalDate}
					onChange={(e) => setGoalDate(e.target.value)}
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
			<Form.Item>
				<Button htmlType="submit">目標を設定</Button>
			</Form.Item>
		</Form>
	)
}

export default GoalSettingForm
