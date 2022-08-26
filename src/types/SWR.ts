import type { KeyedMutator } from "swr"

export interface SwrResponse<T> {
	data: T | undefined
	isError: boolean
	mutate: KeyedMutator<T>
}
