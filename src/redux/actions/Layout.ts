import * as types from '../constants/LayoutActionTypes';

export const collapsed = (collapsed: boolean) => ({
	type: types.COLLAPSED_LAYOUT,
	collapsed: collapsed,
});

export const menu = (path: string) => ({
	type: types.MENU_LAYOUT,
	payload: {
		path,
	},
});
