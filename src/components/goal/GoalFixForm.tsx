import { Box, Button, Flex, Input, Text, Textarea } from "@chakra-ui/react"
import axios from "axios"
import { useContext, useEffect, useState } from "react"

import { UserContext } from "../UserProvider"

type Props = {
	isCompleted: boolean
	defaultTitle: string
	defaultGoalDate: string
	defaultComment: string
	id: string
	setShouldShowFixModal: (value: boolean) => void
}

const GoalFixForm: React.FC<Props> = ({
	isCompleted,
	defaultTitle,
	defaultGoalDate,
	defaultComment,
	id,
	setShouldShowFixModal,
}) => {
	const { me, getGoals } = useContext(UserContext)
	const [title, setTitle] = useState("")
	const [goalDate, setGoalDate] = useState("")
	const [comment, setComment] = useState("")
	useEffect(() => {
		setTitle(defaultTitle)
		setGoalDate(defaultGoalDate)
		setComment(defaultComment)
	}, [defaultTitle, defaultGoalDate, defaultComment]) //propsからuseStateに入れるときはこれしないといけないみたいなやつ

	function handleSubmit(e: any) {
		e.preventDefault()
		if (title === "" || !/^2[0-9]{3}-[0-9]{2}-[0-9]{2}$/.test(goalDate)) {
			alert("タイトルは必須です。期限はyyyy-mm-ddの形式で入力してください。")
			return
		}
		axios
			.put(process.env.NEXT_PUBLIC_URL + "/api/goals/" + id, {
				title: title,
				goalDate: goalDate,
				comment: comment,
				isCompleted: isCompleted,
				createdBy: me.id,
			})
			.then(() => {
				getGoals()
				setTitle("")
				setGoalDate("")
				setComment("")
				setShouldShowFixModal(false)
			})
			.catch((err) => alert(err))
	}

	return (
		<>
			<Box as="form" h="100%" onSubmit={handleSubmit}>
				<Flex flexDirection="column" h="80%" justifyContent="space-around">
					<Text>タイトル</Text>
					<Input
						placeholder="必須項目"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<Text>期限</Text>
					<Input
						placeholder="YYYY-MM-DD"
						value={goalDate}
						onChange={(e) => setGoalDate(e.target.value)}
					/>
					<Text>コメント</Text>
					<Textarea
						placeholder="任意"
						resize="none"
						value={comment}
						onChange={(e) => setComment(e.target.value)}
					/>
					<Flex justifyContent="space-around" mt={4}>
						<Button colorScheme="blue" type="submit" w={32}>
							決定
						</Button>
						<Button w={32} onClick={() => setShouldShowFixModal(false)}>
							戻る
						</Button>
					</Flex>
				</Flex>
			</Box>
		</>
	)
}

export default GoalFixForm
