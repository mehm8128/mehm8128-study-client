import { Button, Form, Input } from "antd"
import { useRouter } from "next/router"
import { useState } from "react"
import { useSetRecoilState } from "recoil"
import { postSignup } from "../../apis/user"
import { meState } from "src/recoil/atoms/user"
import { SignupRequest } from "src/types/user"

const { TextArea } = Input

const SignUp: React.FC = () => {
	const router = useRouter()
	const setMe = useSetRecoilState(meState)
	const [userName, setUserName] = useState("")
	const [password, setPassword] = useState("")
	const [passwordConfirm, setPasswordConfirm] = useState("")
	const [description, setDescription] = useState("")

	async function handleRegister() {
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
		const data: SignupRequest = {
			name: userName,
			password: password,
			description: description,
		}

		await postSignup(data)
			.then((res) => {
				setMe({
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
			<Form className="py-2" labelCol={{ span: 4 }} onFinish={handleRegister}>
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
