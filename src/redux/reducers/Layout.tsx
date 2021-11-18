import { ILayoutState } from '../../infrastructure/interfaces/ILayout';
import * as types from '../../redux/constants/LayoutActionTypes';

const layout = (
	state: ILayoutState = {
		collapsed: false,
		siderbarWidth: 210,
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
	}

	return state;
};

export default layout;
