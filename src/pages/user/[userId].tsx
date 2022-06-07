import { Box, Flex, Heading } from "@chakra-ui/react"
import axios from "axios"
import type { NextPage } from "next"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import UserIntro from "src/components/UserIntro"
import { UserContext } from "src/components/UserProvider"
import GoalList from "src/components/goal/GoalList"
import TimeLine from "src/components/record/TimeLine"
import { User } from "src/types/user"

const User: NextPage = () => {
	const { me, getUsers } = useContext(UserContext)
	const router = useRouter()
	const id = router.query.userId !== "me" ? router.query.userId : me.id
	if (router.isReady) {
		if (!me.auth) router.replace("/login")
	}
	const [user, setUser] = useState<User>()

	useEffect(() => {
		if (!router.isReady) {
			return
		}
		getUsers()
		axios
			.get(process.env.NEXT_PUBLIC_URL + "/api/users/" + id)
			.then((res) => setUser(res.data))
			.catch((err) => alert(err))
	}, [router.query])

	return (
		<>
			<Box h="hull">
				{user !== undefined ? <UserIntro user={user} /> : null}
				<Flex>
					<Box h={500} width="50%">
						<Heading mb={4} textAlign="center">
							勉強の記録
						</Heading>
						<TimeLine
							h="full"
							overflowY="scroll"
							p={2}
							userid={id && id.toString()}
						/>
					</Box>
					<Box h={500} width="50%">
						<Heading mb={4} textAlign="center">
							目標
						</Heading>
						<GoalList
							h="full"
							overflowY="scroll"
							p={2}
							userid={id && id.toString()}
						/>
					</Box>
				</Flex>
			</Box>
		</>
	)
}

export default User
