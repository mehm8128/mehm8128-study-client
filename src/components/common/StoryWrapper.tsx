import { Suspense } from "react"
import { RecoilRoot } from "recoil"
import Wrapper from "./Wrapper"

interface Props {
	children: React.ReactNode
}

const StoryWrapper: React.FC<Props> = ({ children }) => {
	return (
		<Suspense fallback={<div>loading...</div>}>
			<RecoilRoot>
				<Wrapper>{children}</Wrapper>
			</RecoilRoot>
		</Suspense>
	)
}

export default StoryWrapper
