import { useRouter } from "next/router"
import { useContext, useEffect } from "react"

import { UserContext } from "../UserProvider"
import Record from "./Record"

type Props = {
	userid?: string
}

const Timeline: React.FC<Props> = (props) => {
	const router = useRouter()
	const { records, getRecords } = useContext(UserContext)
	useEffect(() => {
		getRecords(props.userid ? props.userid : "")
	}, [router.asPath])

	return (
		<div className="w-full md:w-3/5">
			<ul>
				{records.map((record) => (
					<li className="mb-4" key={record.id}>
						<Record record={record} />
					</li>
				))}
			</ul>
		</div>
	)
}

export default Timeline
