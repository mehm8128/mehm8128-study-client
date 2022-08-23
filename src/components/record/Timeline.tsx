import { useQuery } from "react-query"
import { getRecords } from "../apis/record"

import Record from "./Record"

type Props = {
	userid?: string
}

const Timeline: React.FC<Props> = (props) => {
	const {
		isLoading,
		error,
		data: records,
	} = useQuery("records", () => getRecords(props.userid || ""))

	if (isLoading) {
		return <div>Loading...</div>
	}
	if (error) {
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
