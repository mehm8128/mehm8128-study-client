import { Button } from "antd"
import Link from "next/link"
import { useContext } from "react"

import { UserContext } from "../UserProvider"

const Header: React.FC = () => {
	const { me, logout } = useContext(UserContext)

	function handleLogout() {
		logout()
	}
	return (
		<div className="flex h-16 items-center justify-between bg-gray-200 px-4">
			<h1 className="text-3xl">
				<Link href="/">タイトル</Link>
			</h1>
			<div className="flex justify-around gap-4">
				<Link passHref href="/memorize">
					<Button>単語暗記へ</Button>
				</Link>
				{me.auth ? (
					<>
						<Button onClick={handleLogout}>ログアウト</Button>
						<Link passHref href="/user/me">
							<Button>{me.name}</Button>
						</Link>
					</>
				) : (
					<Link passHref href="/login">
						<Button>ログイン画面へ</Button>
					</Link>
				)}
			</div>
		</div>
	)
}

export default Header
