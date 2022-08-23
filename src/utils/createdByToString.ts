import { UserResponse } from "src/types/user"

export const createdByToString = (createdBy: string, users: UserResponse[]) => {
	return users.find((user) => user.id === createdBy)?.name ?? "unknown"
}
