import type { NextPage } from "next"
import Login from "../components/login/Login"
import SignUp from "../components/login/SignUp"

const LoginPage: NextPage = () => {
	return (
		<>
			<h1 className="mt-4 text-center text-2xl">タイトル</h1>
			<div className="mt-12 flex flex-col justify-around md:flex-row">
				<Login />
				<SignUp />
			</div>
		</>
	)
}

export default LoginPage
