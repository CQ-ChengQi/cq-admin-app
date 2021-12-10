import { IInstanceState } from '../../infrastructure/interfaces/IInstance';
import * as types from '../../redux/constants/InstanceActionTypes';

const layout = (
	state: IInstanceState = {
		data: [],
		total: 0,
		serverSelectData: [],
		init: false,
	},
	action: any,
): IInstanceState => {
	switch (action.type) {
		case types.LOAD_INSTANCE:
			return {
				...state,
				data: action.payload.data,
				total: action.payload.total,
			};
		case types.LOAD_SERVER_SELECT_INSTANCE:
			return {
				...state,
				serverSelectData: action.payload.data,
				init: true,
			};
	}

	return state;
};

export default layout;
