import { Box, ListItem, UnorderedList } from '@chakra-ui/react'

import { records } from '../mock/records'
import Record from './Record'

import type { NextPage } from "next"

const TimeLine: NextPage = () => {
	return (
		<>
			<Box w="60%">
				<UnorderedList listStyleType="none">
					{records.map((record) => (
						<ListItem key={record.id} mb={4}>
							<Record record={record} />
						</ListItem>
					))}
				</UnorderedList>
			</Box>
		</>
	)
}

export default TimeLine
