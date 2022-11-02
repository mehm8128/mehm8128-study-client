import type { KeyedMutator } from "swr"

export interface SwrResponse<T> {
	data: T
	isError: boolean
	mutate: KeyedMutator<T>
}
