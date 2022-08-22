import { Button, Form, Input } from "antd"
import axios from "axios"
import { useRouter } from "next/router"
import { useContext, useState } from "react"

import { UserContext } from "../UserProvider"

const { TextArea } = Input

const SignUp: React.FC = () => {
	const router = useRouter()
	const { login } = useContext(UserContext)
	const [userName, setUserName] = useState("")
	const [password, setPassword] = useState("")
	const [passwordConfirm, setPasswordConfirm] = useState("")
	const [description, setDescription] = useState("")

	function handleRegister() {
		if (
			password !== passwordConfirm ||
			userName.length === 0 ||
			password.length === 0
		) {
			alert(
				"ユーザー名とパスワードは1文字以上必要です。パスワードを確認用パスワードが一致していない可能性があります。"
			)
			return
		}
		axios
			.post(process.env.NEXT_PUBLIC_URL + "/api/users/signup", {
				name: userName,
				password: password,
				description: description,
			})
			.then((res) => {
				login({
					id: res.data.id,
					name: res.data.name,
					auth: true,
				})
				router.push("/")
			})
			.catch((err) => alert(err))
	}

	return (
		<div className="mb-12 w-full border border-4 border-gray-200 px-4 md:w-2/5">
			<h1 className="mt-2 text-center text-xl">新規登録</h1>
			<Form className="py-2" onFinish={handleRegister}>
				<Form.Item label="ユーザー名" name="username">
					<Input
						placeholder="ユーザー名"
						value={userName}
						onChange={(e) => setUserName(e.target.value)}
					/>
				</Form.Item>
				<Form.Item label="パスワード" name="password">
					<Input
						placeholder="パスワード"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Form.Item>
				<Form.Item label="パスワード(確認)" name="passwordConfirm">
					<Input
						placeholder="パスワード(確認)"
						value={passwordConfirm}
						onChange={(e) => setPasswordConfirm(e.target.value)}
					/>
				</Form.Item>
				<Form.Item label="自己紹介" name="description">
					<TextArea
						placeholder="自己紹介"
						rows={5}
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</Form.Item>
				<Form.Item>
					<Button htmlType="submit">登録</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default SignUp
