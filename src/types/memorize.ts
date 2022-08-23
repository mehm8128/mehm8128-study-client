export interface MemorizeResponse {
	id: string
	name: string
	words: WordResponse[]
	createdAt: string
	updatedAt: string
}

export interface WordResponse {
	id: string
	word: string
	wordJp: string
	createdAt: string
}

export interface WordRequest {
	word: string
	wordJp: string
}

export interface QuizResponse {
	answer: WordResponse
	choices: WordResponse[]
}
