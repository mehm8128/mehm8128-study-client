import { atom } from "recoil"
import type { Goal } from "src/types/goal"

export const goalState = atom<Goal[]>({
	key: "goalState",
	default: new Array<Goal>(),
})
