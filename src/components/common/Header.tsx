import { Button } from "antd"
import Link from "next/link"
import router from "next/router"
import { useRecoilState } from "recoil"
import { postLogout } from "../apis/user"
import { meState } from "src/recoil/atoms/user"

const Header: React.FC = () => {
	const [me, setMe] = useRecoilState(meState)

	function handleLogout() {
		postLogout()
			.then(() => {
				setMe({ id: "", name: "", auth: false })
				router.push("/login")
			})
			.catch((err) => alert(err))
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
