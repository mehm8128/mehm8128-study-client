import { atom } from "recoil"
import type { RecordResponse } from "src/types/record"

export const recordsState = atom<RecordResponse[]>({
	key: "recordsState",
	default: new Array<RecordResponse>(),
})
