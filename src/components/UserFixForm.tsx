import { title } from "process"
import { useQueryClient } from "@tanstack/react-query"
import { Button, Form, Input } from "antd"
import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import { putUser } from "src/apis/user"
import { meState } from "src/recoil/atoms/user"
import { UserPutRequest } from "src/types/user"

const { TextArea } = Input

interface Props {
	defaultValues: {
		username: string
		description: string
	}
	setShouldShowFixModal: (value: boolean) => void
}

const UserFixForm: React.FC<Props> = ({
	defaultValues,
	setShouldShowFixModal,
}) => {
	const me = useRecoilValue(meState)
	const [username, setUsername] = useState("")
	const [description, setDescription] = useState("")
	const queryClient = useQueryClient()
	const [form] = Form.useForm()

	async function handleSubmit() {
		if (username.length == 0) {
			alert("ユーザー名は1文字以上必要です。")
			return
		}
		const data: UserPutRequest = {
			id: me.id,
			name: username,
			description: description,
		}
		await putUser(data)
		queryClient.invalidateQueries(["users"])
		setShouldShowFixModal(false)
	}

	useEffect(() => {
		setUsername(defaultValues.username)
		setDescription(defaultValues.description)
	}, [defaultValues.description, defaultValues.username])

	return (
		<Form form={form} labelCol={{ span: 5 }} onFinish={handleSubmit}>
			<Form.Item
				initialValue={defaultValues.username}
				label="ユーザー名"
				name="username"
			>
				<Input
					placeholder="ユーザー名"
					value={title}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</Form.Item>
			<Form.Item
				initialValue={defaultValues.description}
				label="自己紹介"
				name="description"
			>
				<TextArea
					placeholder="自己紹介"
					rows={4}
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
			</Form.Item>
			<Form.Item>
				<Button htmlType="submit">決定</Button>
			</Form.Item>
		</Form>
	)
}

export default UserFixForm
