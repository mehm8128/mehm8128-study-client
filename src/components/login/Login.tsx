import { Button, Form, Input } from "antd"
import { useRouter } from "next/router"
import { useState } from "react"
import { useSetRecoilState } from "recoil"
import { postLogin } from "../../apis/user"
import { meState } from "src/recoil/atoms/user"
import { LoginRequest } from "src/types/user"

const Login: React.FC = () => {
	const router = useRouter()
	const setMe = useSetRecoilState(meState)
	const [userName, setUserName] = useState("")
	const [password, setPassword] = useState("")

	function handleLogin() {
		const data: LoginRequest = {
			name: userName,
			password: password,
		}
		postLogin(data)
			.then((res) => {
				setMe({
					id: res.data.id,
					name: res.data.name,
					auth: true,
				})
				console.log("authed")
				router.push("/")
			})
			.catch((err) => alert(err))
	}
	return (
		<div className="w-full border border-4 border-gray-200 px-4 md:w-2/5">
			<h1 className="mt-2 text-center text-xl">ログイン</h1>
			<Form className="py-2" labelCol={{ span: 3 }} onFinish={handleLogin}>
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
				<Form.Item>
					<Button htmlType="submit">ログイン</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default Login
