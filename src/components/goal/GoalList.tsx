import { useRouter } from "next/router"
import { useContext, useEffect } from "react"

import { UserContext } from "../UserProvider"
import Goal from "./Goal"

type Props = {
	userid?: string
}

const GoalList: React.FC<Props> = (props) => {
	const router = useRouter()
	const { goals, getGoals } = useContext(UserContext)
	useEffect(() => {
		getGoals(props.userid ? props.userid : "")
	}, [router.asPath])

	return (
		<div className="w-full">
			<ul>
				{goals.map((goal) => (
					<li className="mb-4" key={goal.id}>
						<Goal goal={goal} />
					</li>
				))}
			</ul>
		</div>
	)
}

export default GoalList
