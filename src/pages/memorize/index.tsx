import { List } from "antd"
import axios from "axios"

import type { NextPage } from "next"
import Link from "next/link"
import { useState, useEffect } from "react"
import type { MemorizeType } from "../../types/memorize"

const MemorizePortal: NextPage = () => {
	const [memorizes, setMemorizes] = useState<MemorizeType[]>()
	useEffect(() => {
		axios
			.get(process.env.NEXT_PUBLIC_URL + "/api/memorizes")
			.then((res) => {
				setMemorizes(res.data)
			})
			.catch((err) => alert(err))
	}, [])

	return (
		<List
			className="list-disc p-12"
			dataSource={memorizes}
			renderItem={(memorize) => (
				<List.Item className="mb-4" key={memorize.id}>
					<Link href={`/memorize/${memorize.id}`}>
						<a>{memorize.name}の暗記へ</a>
					</Link>
				</List.Item>
			)}
			split={false}
		/>
	)
}

export default MemorizePortal
