import { useQuery } from "@tanstack/react-query"

import { fetchGoals } from "../../apis/goal"
import Goal from "./Goal"

type Props = {
	userId?: string
}

const GoalList: React.FC<Props> = (props) => {
	const {
		isLoading,
		isError,
		data: goals,
	} = useQuery(["goals", props.userId], () => fetchGoals(props.userId || ""))

	if (isLoading) {
		return <div>Loading...</div>
	}
	if (isError) {
		return <div>Error!</div>
	}

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
