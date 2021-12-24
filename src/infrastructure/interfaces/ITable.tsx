export interface IPage {
	filters?: any;
	sorters?: any;
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
