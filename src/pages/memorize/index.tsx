import { List } from "antd"

import type { NextPage } from "next"
import Link from "next/link"

import { useFetchMemorizes } from "src/apis/memorize"

const MemorizePortal: NextPage = () => {
	const { data: memorizes, isError } = useFetchMemorizes()

	if (!memorizes) {
		return <div>Loading...</div>
	}
	if (isError) {
		return <div>Error!</div>
	}
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
