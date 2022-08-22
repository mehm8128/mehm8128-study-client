import GoalList from "../goal/GoalList"
import GoalSettingForm from "../goal/GoalSettingForm"

const GoalListContainer: React.FC = () => {
	return (
		<div className="flex flex-col-reverse justify-around p-4 md:flex-row">
			<GoalList />
			<div className="md:w-3/10 h-4/5 w-full border-2 p-8">
				<h2>目標の設定</h2>
				<GoalSettingForm />
			</div>
		</div>
	)
}

export default GoalListContainer
