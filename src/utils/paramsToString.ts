export const paramToString = (param: string | string[] | undefined) => {
	if (param === undefined) {
		return ""
	}
	if (Array.isArray(param)) {
		return param[0]
	}
	return param
}
