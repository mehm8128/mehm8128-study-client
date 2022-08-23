import { useRouter } from "next/router"
import { useEffect } from "react"
import { useRecoilState } from "recoil"
import { fetchMe } from "../../apis/user"
import { meState } from "src/recoil/atoms/user"

const Wrapper: React.FC = ({ children }) => {
	const router = useRouter()
	const [me, setMe] = useRecoilState(meState)

	useEffect(() => {
		fetchMe()
			.then((res) => {
				setMe({
					id: res.id,
					name: res.name,
					auth: true,
				})
			})
			.catch(() => {
				if (!me.auth) router.replace("/login")
			})
	}, [router.pathname])
	return <>{children}</>
}
export default Wrapper
