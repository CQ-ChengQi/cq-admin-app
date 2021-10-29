import { Dispatch } from 'redux';
import { post } from '../../infrastructure/common/Server';
import * as types from '../constants/ServerActionTypes';
import { IServerAction, IServerModel } from '../../infrastructure/interfaces/IServer';
import { IActionResult, IPage, IPageResult } from '../../infrastructure/interfaces/ITable';

export const add = (state: IServerModel): IServerAction<IServerModel> => ({
	type: types.ADD_SERVER,
	state,
});

export const addAsync = (state: IServerModel) => {
	return (dispatch: Dispatch) => {
		post<IActionResult<IServerModel>>('api/server/add', state).then((res) => {
			dispatch(add(res.data));
		});
	};
};

export const edit = (state: IServerModel): IServerAction<IServerModel> => ({
	type: types.EDIT_SERVER,
	state,
});

export const run = (state: string): IServerAction<string> => ({
	type: types.RUN_SERVER,
	state,
});

export const del = (state: string): IServerAction<string> => ({
	type: types.DEL_SERVER,
	state,
});

export const delAsync = (id: string) => {
	return (dispatch: Dispatch) => {
		post<IActionResult<string>>('api/server/del', { id: id }).then((res) => {
			dispatch(del(res.data));
		});
	};
};

export const edit_code = (state: string): IServerAction<string> => ({
	type: types.EDIT_CODE_SERVER,
	state,
});

export const disbaled = (state: string): IServerAction<string> => ({
	type: types.DISBALED_SERVER,
	state,
});

export const disbaledAsync = (id: string) => {
	return (dispatch: Dispatch) => {
		post<IActionResult<string>>('api/server/disbaled', { id: id }).then((res) => {
			dispatch(disbaled(res.data));
		});
	};
};

export const enabled = (state: string): IServerAction<string> => ({
	type: types.ENABLED_SERVER,
	state,
});

export const enabledAsync = (id: string) => {
	return (dispatch: Dispatch) => {
		post<IActionResult<string>>('api/server/enabled', { id: id }).then((res) => {
			dispatch(enabled(res.data));
		});
	};
};

export const init = (
	state: IPageResult<IServerModel>,
): IServerAction<IPageResult<IServerModel>> => ({
	type: types.INIT_SERVER,
	state,
});

export const initAsync = (state: IPage) => (dispatch: Dispatch) => {
	post<IPageResult<IServerModel>>('api/server/get', state).then((res) => {
		dispatch(init(res));
	});
};

export const editCode= (state: IServerModel) => ({
	type: types.EDIT_CODE_SERVER,
	state,
});

export const editCodeAsync = (state: IServerModel) => (dispatch: Dispatch) => {
	post<IActionResult<IServerModel>>('api/server/edit_code', state).then((res) => {
		dispatch(editCode(res.data));
	});
};
