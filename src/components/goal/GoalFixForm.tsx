import { useQueryClient } from "@tanstack/react-query"
import { Button, Form, Input } from "antd"
import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import { putGoal } from "../../apis/goal"
import { meState } from "src/recoil/atoms/user"
import type { GoalPutRequest } from "src/types/goal"

type Props = {
	isCompleted: boolean
	defaultTitle: string
	defaultGoalDate: string
	defaultComment: string
	id: string
	setShouldShowFixModal: (value: boolean) => void
}

const { TextArea } = Input

const GoalFixForm: React.FC<Props> = ({
	isCompleted,
	defaultTitle,
	defaultGoalDate,
	defaultComment,
	id,
	setShouldShowFixModal,
}) => {
	const me = useRecoilValue(meState)
	const [title, setTitle] = useState("")
	const [goalDate, setGoalDate] = useState("")
	const [comment, setComment] = useState("")
	const queryClient = useQueryClient()
	const [form] = Form.useForm()

	useEffect(() => {
		setTitle(defaultTitle)
		setGoalDate(defaultGoalDate)
		setComment(defaultComment)
	}, [defaultTitle, defaultGoalDate, defaultComment]) //propsからuseStateに入れるときはこれしないといけないみたいなやつ

	async function handleSubmit() {
		if (title === "" || !/^2[0-9]{3}-[0-9]{2}-[0-9]{2}$/.test(goalDate)) {
			alert("タイトルは必須です。期限はyyyy-mm-ddの形式で入力してください。")
			return
		}
		const data: GoalPutRequest = {
			title: title,
			goalDate: goalDate,
			comment: comment,
			isCompleted: isCompleted,
			createdBy: me.id,
		}
		await putGoal(id, data)
		setTitle("")
		setGoalDate("")
		setComment("")
		setShouldShowFixModal(false)
		form.resetFields()
		queryClient.invalidateQueries(["goals"])
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
			<Form.Item label="期限" name="due">
				<Input
					placeholder="YYYY-MM-DD"
					value={goalDate}
					onChange={(e) => setGoalDate(e.target.value)}
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
				<Button htmlType="submit">目標を設定</Button>
			</Form.Item>
		</Form>
	)
}

export default GoalFixForm
