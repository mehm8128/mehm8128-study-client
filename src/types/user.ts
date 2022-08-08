export interface User {
	id: string
	name: string
	description: string
	createdAt: string
	updatedAt: string
}

export interface Me {
	id: string
	name: string
	auth: boolean
}
