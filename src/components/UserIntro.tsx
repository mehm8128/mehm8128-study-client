import { useContext } from 'react'
import { UserContext } from 'src/components/UserProvider'
import { User } from 'src/types/user'
import { createdByToString } from 'src/utils/createdByToString'
import { minutesToHoursAndMinutes } from 'src/utils/minutesToHoursAndMinutes'

import { Avatar, Box, Center, Flex, Text } from '@chakra-ui/react'

import type { NextPage } from "next"
type Props = {
	user: User
}
const UserIntro: NextPage<Props> = (props) => {
	const { users, records } = useContext(UserContext)
	const fullStudyTime = records.reduce((acc, record) => {
		return acc + record.time
	}, 0)
	return (
		<>
			<Box p={4}>
				<Flex>
					<Center>
						<Avatar name={props.user.name} src={""} mr={2}></Avatar>
						<Text fontSize={20}>{createdByToString(props.user.id, users)}</Text>
					</Center>
				</Flex>
				<Box height={20} py={4} px={4}>
					<Text>総勉強時間：{minutesToHoursAndMinutes(fullStudyTime)}</Text>
					<Text whiteSpace="pre-wrap">{props.user.description}</Text>
				</Box>
			</Box>
		</>
	)
}

export default UserIntro
