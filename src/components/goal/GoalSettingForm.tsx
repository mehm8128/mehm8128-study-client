import { Button, Form, Input } from "antd"
import { useState } from "react"
import { useRecoilValue } from "recoil"
import { fetchGoals, postGoal } from "../../apis/goal"
import { meState } from "src/recoil/atoms/user"
import type { GoalPostRequest } from "src/types/goal"

const { TextArea } = Input

const GoalSettingForm: React.FC = () => {
	const me = useRecoilValue(meState)
	const [title, setTitle] = useState("")
	const [goalDate, setGoalDate] = useState("")
	const [comment, setComment] = useState("")

	function handleSubmit() {
		if (title === "" || !/^2[0-9]{3}-[0-9]{2}-[0-9]{2}$/.test(goalDate)) {
			alert("タイトルは必須です。期限はyyyy-mm-ddの形式で入力してください。")
			return
		}
		const data: GoalPostRequest = {
			title: title,
			goalDate: goalDate,
			comment: comment,
			isCompleted: false,
			createdBy: me.id,
		}
		postGoal(data)
			.then(() => {
				fetchGoals()
				setTitle("")
				setGoalDate("")
				setComment("")
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

export default GoalSettingForm
