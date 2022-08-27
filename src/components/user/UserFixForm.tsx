import { title } from "process"
import { Button, Form, Input } from "antd"
import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import { useSWRConfig } from "swr"
import { putUser, useFetchUser } from "src/apis/user"
import { meState } from "src/recoil/atoms/user"
import { UserPutRequest } from "src/types/user"

const { TextArea } = Input

interface Props {
	setShouldShowFixModal: (value: boolean) => void
}

const UserFixForm: React.FC<Props> = ({ setShouldShowFixModal }) => {
	const me = useRecoilValue(meState)
	const [username, setUsername] = useState("")
	const [description, setDescription] = useState("")
	const [form] = Form.useForm()
	const { data: defaultValues, isError } = useFetchUser(me.id)
	const { mutate } = useSWRConfig()

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
		mutate(`${process.env.NEXT_PUBLIC_URL}/api/users/${me.id}`)
		setShouldShowFixModal(false)
	}

	useEffect(() => {
		setUsername(defaultValues!.name)
		setDescription(defaultValues!.description)
	}, [defaultValues?.description, defaultValues?.name])

	if (!defaultValues) {
		return <div>Loading...</div>
	}
	if (isError) {
		return <div>Error!</div>
	}

	return (
		<Form form={form} labelCol={{ span: 5 }} onFinish={handleSubmit}>
			<Form.Item
				initialValue={defaultValues.name}
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
