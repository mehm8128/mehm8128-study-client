export interface MemorizeType {
	id: string
	name: string
	words: WordType[]
	createdAt: string
	updatedAt: string
}

export interface WordType {
	id: string
	word: string
	wordJp: string
	createdAt: string
}

export interface QuizType {
	answer: WordType
	choices: WordType[]
}
