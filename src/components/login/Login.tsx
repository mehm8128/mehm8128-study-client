import { Button, Form, Input } from "antd"
import axios from "axios"
import { useRouter } from "next/router"
import { useContext, useState } from "react"
import { UserContext } from "src/components/UserProvider"

const Login: React.FC = () => {
	const router = useRouter()
	const { login } = useContext(UserContext)
	const [userName, setUserName] = useState("")
	const [password, setPassword] = useState("")

	function handleLogin() {
		axios
			.post(
				process.env.NEXT_PUBLIC_URL + "/api/users/login",
				{
					name: userName,
					password: password,
				},
				{ withCredentials: true }
			)
			.then((res) => {
				login({
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
			<Form className="py-2" onFinish={handleLogin}>
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
