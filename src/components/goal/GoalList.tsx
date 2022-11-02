import Goal from "./Goal"
import { useFetchGoals } from "src/apis/goal"

interface Props {
	userId?: string
}

const GoalList: React.FC<Props> = (props) => {
	const { data: goals, isError } = useFetchGoals(props.userId ?? "", {
		suspense: true,
	})

	if (isError) {
		return <div>Error!</div>
	}

	return (
		<div className="w-full">
			<ul>
				{goals?.map((goal) => (
					<li className="mb-4" key={goal.id}>
						<Goal goal={goal} />
					</li>
				))}
			</ul>
		</div>
	)
}

export default GoalList
