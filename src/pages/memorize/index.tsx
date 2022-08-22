import { List } from "antd"

import type { NextPage } from "next"
import Link from "next/link"
import { useState, useEffect } from "react"
import type { Memorize } from "../../types/memorize"
import { getMemorizes } from "src/components/apis/memorize"

const MemorizePortal: NextPage = () => {
	const [memorizes, setMemorizes] = useState<Memorize[]>()
	useEffect(() => {
		setMemorizes(getMemorizes()) //react queryでなんとかする
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
