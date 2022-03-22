import { Box, ListItem, UnorderedList } from '@chakra-ui/react'

import { goals } from '../mock/goals'
import Goal from './Goal'

import type { NextPage } from "next"

const GoalList: NextPage = () => {
	return (
		<>
			<Box w="60%">
				<UnorderedList listStyleType="none">
					{goals.map((goal) => (
						<ListItem key={goal.id} mb={4}>
							<Goal goal={goal} />
						</ListItem>
					))}
				</UnorderedList>
			</Box>
		</>
	)
}

export default GoalList
