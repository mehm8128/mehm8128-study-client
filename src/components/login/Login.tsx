import { Box, Button, Flex, Heading, Input } from "@chakra-ui/react"
import axios from "axios"
import { useRouter } from "next/router"
import { useContext, useState } from "react"
import { UserContext } from "src/components/UserProvider"

const Login: React.FC = () => {
	const router = useRouter()
	const { login } = useContext(UserContext)
	const [userName, setUserName] = useState("")
	const [password, setPassword] = useState("")
	function handleLogin(e: any) {
		e.preventDefault()
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
		<>
			<Box
				borderColor="gray.200"
				borderWidth={4}
				h="70%"
				w={{ base: "100%", md: "40%" }}
			>
				<Heading mt={2} textAlign="center">
					ログイン
				</Heading>
				<Box as="form" h="80%" onSubmit={handleLogin}>
					<Flex flexDirection="column" h="100%" justifyContent="space-around">
						<Input
							placeholder="ユーザー名"
							value={userName}
							onChange={(e) => setUserName(e.target.value)}
						/>
						<Input
							placeholder="パスワード"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<Button type="submit">ログイン</Button>
					</Flex>
				</Box>
			</Box>
		</>
	)
}

export default Login
