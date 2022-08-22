import { RecordFavorite } from "./favorite"

export interface Record {
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
