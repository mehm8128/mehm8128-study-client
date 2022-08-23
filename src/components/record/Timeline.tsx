import { useQuery } from "react-query"
import { fetchRecords } from "../../apis/record"

import Record from "./Record"

type Props = {
	userid?: string
}

const Timeline: React.FC<Props> = (props) => {
	const {
		isLoading,
		isError,
		data: records,
	} = useQuery("records", () => fetchRecords(props.userid || ""))

	if (isLoading) {
		return <div>Loading...</div>
	}
	if (isError) {
		return <div>Error!</div>
	}
	return (
		<div className="w-full">
			<ul>
				{records!.map((record) => (
					<li className="mb-4" key={record.id}>
						<Record record={record} />
					</li>
				))}
			</ul>
		</div>
	)
}

export default Timeline
