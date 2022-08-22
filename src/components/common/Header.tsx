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
					<button className="btn">単語暗記へ</button>
				</Link>
				{me.auth ? (
					<>
						<button className="btn" onClick={handleLogout}>
							ログアウト
						</button>
						<Link passHref href="/user/me">
							<button className="btn">{me.name}</button>
						</Link>
					</>
				) : (
					<Link passHref href="/login">
						<button className="btn">ログイン画面へ</button>
					</Link>
				)}
			</div>
		</div>
	)
}

export default Header
