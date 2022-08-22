import { atom } from "recoil"
import type { Record } from "src/types/record"

export const recordState = atom<Record[]>({
	key: "recordState",
	default: new Array<Record>(),
})
