import { Box, Button, Flex, Input, Text, Textarea } from "@chakra-ui/react"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "src/components/UserProvider"

type Props = {
	defaultTitle: string
	defaultPage: string
	defaultTime: string
	defaultComment: string
	id: string
	setShouldShowFixModal: (value: boolean) => void
}

const RecordForm: React.FC<Props> = ({
	defaultTitle,
	defaultPage,
	defaultTime,
	defaultComment,
	id = "",
	setShouldShowFixModal,
}) => {
	const { me, getRecords } = useContext(UserContext)
	const [title, setTitle] = useState("")
	const [page, setPage] = useState("")
	const [time, setTime] = useState("")
	const [comment, setComment] = useState("")
	useEffect(() => {
		setTitle(defaultTitle)
		setPage(defaultPage)
		setTime(defaultTime)
		setComment(defaultComment)
	}, [defaultTitle, defaultPage, defaultTime, defaultComment]) //propsからuseStateに入れるときはこれしないといけないみたいなやつ

	function handleSubmit(e: any) {
		e.preventDefault()
		if (title === "" || (!/[0-9]+/.test(time) && !/[0-9]+/.test(page))) {
			alert("タイトルは必須です。ページと時間は半角数字で入力してください。")
			return
		}
		axios
			.put(process.env.NEXT_PUBLIC_URL + "/api/records/" + id, {
				title: title,
				page: Number(page),
				time: Number(time),
				comment: comment,
				createdBy: me.id,
			})
			.then(() => {
				getRecords()
				setTitle("")
				setPage("")
				setTime("")
				setComment("")
				setShouldShowFixModal(false)
			})
			.catch((err) => alert(err))
	}

	return (
		<Box as="form" h="100%" onSubmit={handleSubmit}>
			<Flex flexDirection="column" h="80%" justifyContent="space-around">
				<Text>タイトル</Text>
				<Input
					placeholder="必須項目"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<Text>ページ数</Text>
				<Input
					placeholder="半角数字(任意)"
					value={page}
					onChange={(e) => setPage(e.target.value)}
				/>
				<Text>時間</Text>
				<Input
					placeholder="半角数字(任意)"
					value={time}
					onChange={(e) => setTime(e.target.value)}
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
	)
}

export default RecordForm
