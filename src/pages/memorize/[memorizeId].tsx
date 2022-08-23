import { useQuery } from "@tanstack/react-query"
import { List, Button } from "antd"
import type { NextPage } from "next"
import { useRouter } from "next/router"
import { useState } from "react"

import { fetchQuiz } from "src/apis/memorize"
import { paramToString } from "src/utils/paramsToString"

type Judge = 0 | 1 | 2 //0：まだ、1:正解、2:不正解

const Memorize: NextPage = () => {
	const router = useRouter()
	const id = paramToString(router.query.memorizeId)
	const { isLoading, isError, data } = useQuery(["quize", id], () =>
		fetchQuiz(id)
	)
	const [count, setCount] = useState(0)
	const [judge, setJudge] = useState<Judge>(0)

	if (isLoading) {
		return <div>Loading...</div>
	}
	if (isError) {
		return <div>Error!</div>
	}

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

	return (
		<div className="p-8">
			<h1 className="pb-8 text-2xl">タイトル</h1>
			<div className="md:w-1/5">
				{data[count].answer.word ? (
					<p className="pb-2 text-xl">
						{data[count].answer.word}の意味を選んでください
					</p>
				) : (
					"データがありません。"
				)}
				<List
					dataSource={data && data[count].choices}
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
						{count !== data.length - 1 ? (
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
