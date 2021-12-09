import { ILayoutState } from '../../infrastructure/interfaces/ILayout';
import * as types from '../../redux/constants/LayoutActionTypes';

const layout = (
	state: ILayoutState = {
		collapsed: false,
		siderbarWidth: 210,
		menu: '',
	},
	action: any,
): ILayoutState => {
	switch (action.type) {
		case types.COLLAPSED_LAYOUT:
			return {
				...state,
				siderbarWidth: action.collapsed ? 70 : 230,
				collapsed: action.collapsed,
			};
		case types.MENU_LAYOUT:
			console.log(action.payload);
			return {
				...state,
				menu: action.payload.path,
			};
	}

	return state;
};

export default layout;
