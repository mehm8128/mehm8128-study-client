import Record from "./Record"
import { useFetchRecords } from "src/apis/record"

interface Props {
	userId?: string
}

const Timeline: React.FC<Props> = (props) => {
	const { data: records, isError } = useFetchRecords(props.userId ?? "")

	if (isError) {
		return <div>Error!</div>
	}
	return (
		<div className="w-full">
			<ul>
				{records?.map((record) => (
					<li className="mb-4" key={record.id}>
						<Record record={record} />
					</li>
				))}
			</ul>
		</div>
	)
}

export default Timeline
