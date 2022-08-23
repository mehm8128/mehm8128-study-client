import { useQuery } from "react-query"
import { getGoals } from "../apis/goal"
import Goal from "./Goal"

type Props = {
	userid?: string
}

const GoalList: React.FC<Props> = (props) => {
	const {
		isLoading,
		error,
		data: goals,
	} = useQuery("goals", () => getGoals(props.userid || ""))

	if (isLoading) {
		return <div>Loading...</div>
	}
	if (error) {
		return <div>Error!</div>
	}

	return (
		<div className="w-full">
			<ul>
				{goals!.map((goal) => (
					<li className="mb-4" key={goal.id}>
						<Goal goal={goal} />
					</li>
				))}
			</ul>
		</div>
	)
}

export default GoalList
