import { List, Button } from "antd"
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
		if (count < data!.length - 1) {
			setJudge(0)
			setCount(count + 1)
		}
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
		<div className="p-8">
			<h1 className="pb-8 text-2xl">タイトル</h1>
			<div className="md:w-1/5">
				{data && data[count].answer && data[count].answer.word ? (
					<p className="pb-2 text-xl">
						{data[count].answer.word}の意味を選んでください
					</p>
				) : (
					"データがありません。"
				)}
				<List
					dataSource={data![count].choices}
					renderItem={(choice) => (
						<List.Item key={choice.id}>
							<Button
								className="w-full"
								onClick={() => handleAnswer(choice.id)}
							>
								{choice.wordJp}
							</Button>
						</List.Item>
					)}
					split={false}
				/>

				{judge !== 0 ? (
					<div className="mt-2 flex justify-around">
						{judge === 1 ? "正解" : "不正解"}
						{count !== data!.length - 1 ? (
							<Button onClick={handleGoToNext}>次へ</Button>
						) : (
							<p>終わり</p>
						)}
					</div>
				) : null}
			</div>
		</div>
	)
}

export default Memorize
