import {
	Box,
	Button,
	Flex,
	Heading,
	List,
	ListItem,
	Text,
} from "@chakra-ui/react"
import axios from "axios"
import type { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { QuizType } from "src/types/memorize"

type Judge = 0 | 1 | 2 //0：まだ、1:正解、2:不正解

const Memorize: NextPage = () => {
	const router = useRouter()
	const id = router.query.memorizeId
	const [data, setData] = useState<QuizType[]>()
	const [count, setCount] = useState(0)
	const [judge, setJudge] = useState<Judge>(0)

	function handleAnswer(id: string) {
		if (id === data![count].answer.id) {
			setJudge(1)
		} else {
			setJudge(2)
		}
	}
	function handleGoToNext() {
		setJudge(0)
		setCount(count + 1)
	}

	useEffect(() => {
		if (!router.isReady) {
			return
		}
		axios
			.get(process.env.NEXT_PUBLIC_URL + "/api/memorizes/" + id + "/quiz")
			.then((res) => {
				setData(res.data)
				console.log(res.data)
			})
			.catch((err) => alert(err))
	}, [router.query])

	return (
		<>
			<Box p="8">
				<Heading as="h1" pb="8" size="lg">
					タイトル名前表示する
				</Heading>
				<Box w={{ base: "", md: "20%" }}>
					{data && data[count].answer.word ? (
						<Text fontSize="xl" pb="2">
							{data[count].answer.word}の意味を選んでください
						</Text>
					) : (
						"データがありません。"
					)}
					<List spacing={2}>
						{data &&
							data[count] &&
							data[count].choices &&
							data[count].choices.map((choice) => (
								<ListItem key={choice.id}>
									<Button w="100%" onClick={() => handleAnswer(choice.id)}>
										{choice.wordJp}
									</Button>
								</ListItem>
							))}
					</List>
					{judge !== 0 ? (
						<Flex justifyContent="space-around" mt={2}>
							{judge === 1 ? "正解" : "不正解"}
							<Button onClick={handleGoToNext}>次へ</Button>
						</Flex>
					) : null}
				</Box>
			</Box>
		</>
	)
}

export default Memorize
