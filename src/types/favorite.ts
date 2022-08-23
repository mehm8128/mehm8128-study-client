export interface RecordFavorite {
	id: string
	createdBy: string
	createdAt: string
	recordId: string
}
export interface GoalFavorite {
	id: string
	createdBy: string
	createdAt: string
	goalId: string
}

export interface RecordFavoritePutRequest {
	createdBy: string
}

export interface GoalFavoritePutRequest {
	createdBy: string
}
