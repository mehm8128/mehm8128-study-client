export interface UserResponse {
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

export interface SignupRequest {
	name: string
	password: string
	description: string
}

export interface LoginRequest {
	name: string
	password: string
}

export interface UserPutRequest {
	id: string
	name: string
	description: string
}
