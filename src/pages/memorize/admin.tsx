import { Select, Input, Form, Button } from "antd"
import type { NextPage } from "next"
import { useState } from "react"
import { useQuery } from "react-query"
import type { WordRequest } from "../../types/memorize"
import { getMemorizes, postWords } from "src/components/apis/memorize"

const { Option } = Select

const Admin: NextPage = () => {
	const [newWord, setNewWord] = useState<string>("")
	const [newWordJp, setNewWordJp] = useState<string>("")
	const {
		isLoading,
		error,
		data: memorizes,
	} = useQuery(["memorizes"], getMemorizes)
	const [targetMemorize, setTargetMemorize] = useState<string>()
	async function handleRegister() {
		if (!/^[a-zA-Z]+$/.test(newWord)) {
			alert("英単語はアルファベットで入力してください")
			return
		}
		if (targetMemorize === undefined) {
			alert("暗記対象を選択してください")
			return
		}
		const data: WordRequest = {
			word: newWord,
			wordJp: newWordJp,
		}
		const res = await postWords(targetMemorize, data)
		if (res.status === 200) {
			setNewWord("")
			setNewWordJp("")
		}
	}
	if (isLoading) {
		return <div>Loading...</div>
	}
	if (error) {
		return <div>Error!</div>
	}

	return (
		<div className="p-4 md:w-1/5">
			<h1 className="px-2 pb-2 text-2xl">新しい単語を追加</h1>
			<Form onFinish={handleRegister}>
				<Form.Item label="追加先" name="memorize">
					<Select
						showSearch
						placeholder="追加先"
						value={targetMemorize}
						onChange={(value) => setTargetMemorize(value)}
					>
						{memorizes !== undefined
							? memorizes.map((memorize) => (
									<Option key={memorize.id} value={memorize.id}>
										{memorize.name}
									</Option>
							  ))
							: null}
					</Select>
				</Form.Item>
				<Form.Item label="追加する単語(英語)" name="english">
					<Input
						placeholder="追加する単語(英語)"
						value={newWord}
						onChange={(e) => setNewWord(e.target.value)}
					/>
				</Form.Item>
				<Form.Item label="追加する単語(日本語)" name="japanese">
					<Input
						placeholder="追加する単語(日本語)"
						value={newWordJp}
						onChange={(e) => setNewWordJp(e.target.value)}
					/>
				</Form.Item>
				<Form.Item>
					<Button htmlType="submit">追加</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default Admin
