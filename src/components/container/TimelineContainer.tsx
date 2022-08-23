import RecordForm from "../record/RecordForm"
import Timeline from "../record/Timeline"

const TimelineContainer: React.FC = () => {
	return (
		<div className="flex flex-col-reverse justify-around gap-12 p-4 md:flex-row">
			<Timeline />
			<div className="md:w-3/10 h-4/5 w-full border-2 p-4">
				<h2>勉強の記録</h2>
				<RecordForm />
			</div>
		</div>
	)
}

export default TimelineContainer
