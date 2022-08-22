import { atom } from "recoil"
import type { Me, User } from "src/types/user"

export const meState = atom<Me>({
	key: "meState",
	default: {
		id: "",
		name: "",
		auth: false,
	},
})

export const userState = atom<User[]>({
	key: "userState",
	default: new Array<User>(),
})
