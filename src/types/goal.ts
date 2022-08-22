import { GoalFavorite } from "./favorite"

export interface Goal {
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
