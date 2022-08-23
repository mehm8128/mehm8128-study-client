import { GoalFavorite } from "./favorite"

export interface GoalResponse {
	id: string
	title: string
	comment: string
	goalDate: string
	isCompleted: boolean
	favorites: GoalFavorite[]
	favoriteNum: number
	createdBy: string
	createdAt: string
	updatedAt: string
}

export interface GoalPostRequest {
	title: string
	goalDate: string
	comment: string
	isCompleted: boolean
	createdBy: string
}

export interface GoalPutRequest {
	title: string
	comment: string
	goalDate: string
	isCompleted: boolean
	createdBy: string
}
