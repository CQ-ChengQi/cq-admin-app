export interface IPageFilter {}
export interface IPageSorter {
	key: string;
	value: string;
	order: number;
}

export interface IPage {
	page: number;
	pagesize: number;
	filters?: IPageFilter;
	sorters?: IPageSorter[];
}

export interface IPageResult<T> {
	data: T[];
	total: number;
}

export interface IActionResult<T> {
	success: boolean;
	data: T;
	message: string;
}
