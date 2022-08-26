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
	const { data: me, isError } = useFetchMe(options)
	const setMe = useSetRecoilState(meState)

	if (!me) {
		return <div>Loading...</div>
	}
	if (isError) {
		return <div>Error!</div>
	}

	return <>{children}</>
}
export default Wrapper
