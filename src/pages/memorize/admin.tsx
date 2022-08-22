import { Select, Input, Form, Button } from "antd"
import axios from "axios"
import type { NextPage } from "next"
import { useEffect, useState } from "react"
import type { MemorizeType } from "../../types/memorize"

const { Option } = Select

const Admin: NextPage = () => {
	const [newWord, setNewWord] = useState<string>("")
	const [newWordJp, setNewWordJp] = useState<string>("")
	const [memorizes, setMemorizes] = useState<MemorizeType[]>()
	const [targetMemorize, setTargetMemorize] = useState<string>()
	function handleRegister(e: any) {
		if (!/^[a-zA-Z]+$/.test(newWord)) {
			alert("英単語はアルファベットで入力してください")
			return
		}
		const data = {
			word: newWord,
			wordJp: newWordJp,
		}
		axios
			.post(
				process.env.NEXT_PUBLIC_URL + `/api/memorizes/${targetMemorize}/words`,
				data
			)
			.then(() => {
				console.log("added!")
				setNewWord("")
				setNewWordJp("")
			})
			.catch((err) => alert(err))
	}
	useEffect(() => {
		axios
			.get(process.env.NEXT_PUBLIC_URL + "/api/memorizes")
			.then((res) => {
				setMemorizes(res.data)
			})
			.catch((err) => alert(err))
	}, [])

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
