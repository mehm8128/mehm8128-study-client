export interface Memorize {
	id: string
	name: string
	words: Word[]
	createdAt: string
	updatedAt: string
}

export interface Word {
	id: string
	word: string
	wordJp: string
	createdAt: string
}

export interface WordRequest {
	word: string
	wordJp: string
}

export interface Quiz {
	answer: Word
	choices: Word[]
}
