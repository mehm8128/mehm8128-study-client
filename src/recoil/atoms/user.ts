import { atom } from "recoil"
import type { Me, UserResponse } from "src/types/user"

export const meState = atom<Me>({
	key: "meState",
	default: {
		id: "",
		name: "",
		auth: false,
	},
})

export const usersState = atom<UserResponse[]>({
	key: "usersState",
	default: new Array<UserResponse>(),
})
