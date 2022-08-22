import { Button, Form, Input } from "antd"
import axios from "axios"
import { useContext, useEffect, useState } from "react"

import { UserContext } from "../UserProvider"

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
	const { me, getGoals } = useContext(UserContext)
	const [title, setTitle] = useState("")
	const [goalDate, setGoalDate] = useState("")
	const [comment, setComment] = useState("")
	useEffect(() => {
		setTitle(defaultTitle)
		setGoalDate(defaultGoalDate)
		setComment(defaultComment)
	}, [defaultTitle, defaultGoalDate, defaultComment]) //propsからuseStateに入れるときはこれしないといけないみたいなやつ

	function handleSubmit() {
		if (title === "" || !/^2[0-9]{3}-[0-9]{2}-[0-9]{2}$/.test(goalDate)) {
			alert("タイトルは必須です。期限はyyyy-mm-ddの形式で入力してください。")
			return
		}
		axios
			.put(process.env.NEXT_PUBLIC_URL + "/api/goals/" + id, {
				title: title,
				goalDate: goalDate,
				comment: comment,
				isCompleted: isCompleted,
				createdBy: me.id,
			})
			.then(() => {
				getGoals()
				setTitle("")
				setGoalDate("")
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
