import { atom } from "recoil"
import type { GoalResponse } from "src/types/goal"

export const goalsState = atom<GoalResponse[]>({
	key: "goalsState",
	default: new Array<GoalResponse>(),
})
