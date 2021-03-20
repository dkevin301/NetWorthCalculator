// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_sortby-and-_orderby
export const SortBy = (key: string) => {
	return (a: any, b: any) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0);
};
