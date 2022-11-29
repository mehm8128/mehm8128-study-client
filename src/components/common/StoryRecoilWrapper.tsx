import { RecoilRoot } from "recoil"
import Wrapper from "./Wrapper"

interface Props {
	children: React.ReactNode
}

const StoryRecoilWrapper: React.FC<Props> = ({ children }) => {
	return (
		<RecoilRoot>
			<Wrapper>{children}</Wrapper>
		</RecoilRoot>
	)
}

export default StoryRecoilWrapper
