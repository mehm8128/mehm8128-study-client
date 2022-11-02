import { useRouter } from "next/router"
import { useSetRecoilState } from "recoil"
import type { SWRConfiguration } from "swr"
import { useFetchMe } from "../../apis/user"
import { meState } from "src/recoil/atoms/user"

interface Props {
	children: React.ReactNode
}

const Wrapper: React.FC<Props> = ({ children }) => {
	const router = useRouter()
	const setMe = useSetRecoilState(meState)
	const options: SWRConfiguration = {
		onSuccess: (data) => {
			setMe({
				id: data.id,
				name: data.name,
				auth: true,
			})
		},
		onError: () => {
			router.push("/login")
		},
	}
	// todo:me使ってないからどうにかする
	const { data: me } = useFetchMe(options)

	return <>{children}</>
}
export default Wrapper
