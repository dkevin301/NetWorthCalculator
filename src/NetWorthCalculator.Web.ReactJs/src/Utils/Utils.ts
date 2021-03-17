// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore
export const SortBy = (key: string) => {
	return (a: any, b: any) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0);
};

// TODO: Refine check
export const IsValidAmount = (amount: string | number) => {
	if (typeof amount === "string") {
		return amount.length <= 18;
	}
	else if (typeof amount === "number") {
		return amount.toString().length <= 18;
	}
	return false;
}