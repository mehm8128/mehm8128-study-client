import { RecordFavorite } from "./favorite"

export interface RecordResponse {
	id: string
	title: string
	page: number
	time: number
	comment: string
	favorites: RecordFavorite[]
	favoriteNum: number
	fileId: string
	createdBy: string
	createdAt: string
	updatedAt: string
}

export interface RecordPostRequest {
	title: string
	page: number
	time: number
	comment: string
	fileId: string | null
	createdBy: string
}

export interface RecordPutRequest {
	title: string
	page: number
	time: number
	comment: string
	createdBy: string
}
