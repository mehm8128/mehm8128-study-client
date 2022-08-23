import { RecordFavorite } from "./favorite"

export interface RecordResponse {
	id: string
	title: string
	page: number
	time: number
	comment: string
	favorites: RecordFavorite[]
	favoriteNum: number
	createdBy: string
	createdAt: string
	updatedAt: string
}
