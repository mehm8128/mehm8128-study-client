import { atom } from "recoil"
import type { Me } from "src/types/user"

export const meState = atom<Me>({
	key: "meState",
	default: {
		id: "",
		name: "",
		auth: false,
	},
})
